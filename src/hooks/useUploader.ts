import { useEffect, useReducer } from "react";
import { pingURL } from "./useApi";

const CHUNK_SIZE = 8 * 1024 * 1024; // 8MB chunk size

function getChunkCount(file: File): number {
	return Math.ceil(file.size / CHUNK_SIZE);
}

/**
 * Hook to handle uploading data
 */
function useUploader(): [UploadFunction, UploaderStatus] {
	const [state, dispatch] = useReducer(
		(prev: State, action: Action): State => {
			if (prev.status === "UPLOADING") {
				if (action.type === "NEXT_CHUNK") {
					const fileDone =
						prev.chunkIndex >=
						prev.chunkCount - 1;

					if (!fileDone) {
						return {
							...prev,
							chunkIndex: prev.chunkIndex + 1
						};
					}

					// From here on out, we know the file finished
					//
					// If it was the last file (the upload finished)
					if (
						prev.fileIndex >=
						prev.files.length - 1
					) {
						if (prev.onUpload)
							prev.onUpload(true);
						return { status: "SUCCESS" };
					}

					// From here on out, we know the file finished, but it wasn't the last file

					const nextFile = prev.files.item(
						prev.fileIndex + 1
					);
					if (!nextFile)
						throw Error("Invalid file error.");

					return {
						...prev,
						chunkIndex: 0,
						chunkCount: getChunkCount(nextFile),
						fileIndex: prev.fileIndex + 1
					};
				} else if (action.type === "ERROR") {
					if (prev.onUpload) {
						prev.onUpload(false);
					}

					return {
						status: "ERROR",
						message: `Unable to upload file ${prev.files.item(prev.fileIndex)}`
					};
				}
			}

			// If not currently uploading, we can continue to check the action
			if (action.type === "UPLOAD") {
				const file = action.files.item(0);
				if (file === null)
					throw Error("File is null.");

				return {
					status: "UPLOADING",
					url: action.url,
					files: action.files,
					chunkIndex: 0,
					chunkCount: getChunkCount(file),
					fileIndex: 0,
					onUpload: action.onUpload
				};
			} else return { ...prev };
		},
		{ status: "IDLE" }
	);

	const startUploading: UploadFunction = (
		url: string,
		files,
		onUpload
	) => {
		if (state.status !== "UPLOADING") {
			dispatch({
				type: "UPLOAD",
				url,
				files,
				onUpload
			});
		}

		return;
	};

	useEffect(() => {
		if (state.status !== "UPLOADING") return;

		const fd = new FormData();

		const file = state.files.item(state.fileIndex);
		if (!file) throw Error("Invalid file error.");

		fd.append(
			"path",
			state.files[state.fileIndex].webkitRelativePath
		);

		const start = state.chunkIndex * CHUNK_SIZE;
		const end = Math.min(file.size, start + CHUNK_SIZE);
		const chunk = file.slice(start, end);

		fd.append("chunk", chunk);
		fd.append(
			"offset",
			String(state.chunkIndex * CHUNK_SIZE)
		);

		pingURL({
			method: "POST",
			endpoint: state.url,
			body: fd
		})
			.then((_data) => {
				dispatch({ type: "NEXT_CHUNK" });
			})
			.catch((err) => {
				dispatch({
					type: "ERROR",
					message: (err as Error).message
				});
			});
	}, [{ ...state }]);

	switch (state.status) {
		case "UPLOADING": {
			const currentFile = state.files.item(
				state.fileIndex
			);
			if (!currentFile) {
				throw Error(
					"Status is uploading but no file is available."
				);
			}
			const currentChunkIndex = state.chunkIndex;
			const chunkCount = Math.ceil(
				currentFile.size / CHUNK_SIZE
			);

			return [
				startUploading,
				{
					status: "UPLOADING",
					currentFileIndex: state.fileIndex,
					currentFileName:
						currentFile?.name || "Error",
					currentChunkIndex,
					chunkCount,
					fileCount: state.files.length
				}
			];
		}
		case "IDLE": {
			return [startUploading, { status: "IDLE" }];
		}
		case "SUCCESS": {
			return [startUploading, { status: "IDLE" }];
		}
		case "ERROR": {
			return [
				startUploading,
				{ status: "ERROR", message: state.message }
			];
		}
		default: {
			return [
				startUploading,
				{
					status: "ERROR",
					message: "An unknown error has occurred"
				}
			];
		}
	}
}

export default useUploader;

interface BaseStatus {
	status: "UPLOADING" | "ERROR" | "IDLE";
}

interface UploadingStatus extends BaseStatus {
	status: "UPLOADING";

	currentFileName: string;
	currentFileIndex: number;
	fileCount: number;

	currentChunkIndex: number;
	chunkCount: number;
}

interface IdleStatus extends BaseStatus {
	status: "IDLE";
}

interface ErrorStatus extends BaseStatus {
	status: "ERROR";
	message: string;
}

type UploaderStatus =
	| UploadingStatus
	| IdleStatus
	| ErrorStatus;

type UploadFunction = (
	url: string,
	files: FileList,
	onUpload?: UploadFinishedCallback
) => void;

type UploadFinishedCallback = (
	success: boolean
) => void | Promise<void>;

interface StateBase {
	status: "UPLOADING" | "SUCCESS" | "ERROR" | "IDLE";
}

interface StateIdle extends StateBase {
	status: "IDLE" | "SUCCESS";
}

interface StateError extends StateBase {
	status: "ERROR";
	message: string;
}

interface StateUploading extends StateBase {
	status: "UPLOADING";

	url: string;

	files: FileList;
	fileIndex: number;
	chunkIndex: number;
	chunkCount: number;

	onUpload?: UploadFinishedCallback;
}

interface ActionBase {
	type: "UPLOAD" | "NEXT_CHUNK" | "ERROR";
}

interface ActionUpload extends ActionBase {
	type: "UPLOAD";
	url: string;
	files: FileList;
	onUpload?: UploadFinishedCallback;
}

interface ActionNextChunk extends ActionBase {
	type: "NEXT_CHUNK";
}

interface ActionError extends ActionBase {
	type: "ERROR";
	message: string;
}

type State = StateUploading | StateIdle | StateError;
type Action = ActionUpload | ActionNextChunk | ActionError;
