// interface UploadedFile {}

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

/*
type UploaderState = [
	{
		currentFile: {};
		currentFileIndex: number;

		fileCount: number;

		currentFileChunk: number;
		currentFileChunkCount: number;
	},
	string // Current file
	//
];
*/

type UploadFunction = (
	url: string,
	files: FileList,
	onUpload?: UploadCallback
) => void;

type UploadCallback = (
	success: boolean
) => void | Promise<void>;

/**
 * Hook to handle uploading data
 */
function useUploader(): [UploadFunction, UploaderStatus] {
	const startUploading: UploadFunction = (
		_files,
		_onUpload
	) => {
		return;
	};

	// const tempStatus: UploaderStatus = { status: "IDLE" };
	const tempStatus: UploaderStatus = {
		status: "UPLOADING",

		currentFileName: "buildweb.data.gz",
		currentFileIndex: 2,
		fileCount: 28,
		chunkCount: 200,
		currentChunkIndex: 85
	};

	return [startUploading, tempStatus];
}

export default useUploader;
