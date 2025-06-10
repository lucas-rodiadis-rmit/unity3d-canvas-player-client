import { JSX, useMemo, useState } from "react";
import "./ProjectUploader.css";

import {
	CreateUnityAppPayload,
	PartialUnityAppConfig
} from "@api/types";
import useUploader from "../hooks/useUploader";
import { API_URL } from "../constants";
import { pingAPI } from "../hooks/useApi";

import { useNavigate } from "react-router-dom";

declare module "react" {
	interface InputHTMLAttributes<T>
		extends HTMLAttributes<T> {
		webkitdirectory?: string;
	}
}

function ProjectUploader() {
	const [unityAppPayload, setUnityAppPayload] =
		useState<CreateUnityAppPayload>({
			name: "",
			playerOptions: {
				allowFullscreen: false,
				allowReloading: false,
				allowResizing: false,
				showFPS: false
			}
		});

	const [files, setFiles] = useState<FileList | null>(
		null
	);

	const navigate = useNavigate();

	const [upload, uploadState] = useUploader();


	const handleUploadClick = async () => {
		// Show alerts if anything is missing or invalid
		if (!files || !files.length) {
			alert("Please select a file.");
			return;
		} else if (!unityAppPayload.name.trim()) {
			alert("Please enter a project name.");
			return;
		} else if (
			(unityAppPayload.playerOptions.embedWidth !== undefined &&
				unityAppPayload.playerOptions.embedWidth < 0) ||
			(unityAppPayload.playerOptions.embedHeight !== undefined &&
				unityAppPayload.playerOptions.embedHeight < 0)
		) {
			alert(
				"Width and Height must be positive numbers."
			);
			return;
		}

		console.log("Uploading files:", files);

		try {
			const data = await pingAPI<
				PartialUnityAppConfig
			>({
				endpoint: "unity-config",
				method: "POST",
				body: unityAppPayload
			});

			console.debug(data);

			upload(`${API_URL}/unity-config/${data.id}/upload`, files, (success) => {
				if (success) {
					alert(
						`Successfully uploaded ${data.name}. You should be able to embed it now.`
					);
				}
				else {
					alert(
						`Errors occurred while uploading ${data.name}. Please try deleting it from the server and uploading it again.`
					);
				}
			});
		}
		catch (error) {
			console.error("An error occurred while uploading the app: ", error);
		}
	};

	// Generic handler for all inputs/selects
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		// Get the name of the html input which was changed, and its new value
		const { name, checked, value, type, files } =
			e.target as HTMLInputElement;

		const setPlayerOption = (value: any) => {
			setUnityAppPayload((prev) => ({
				...prev,
				playerOptions: {
					...prev.playerOptions,
					[name]: value
				}
			}));

		}

		// Check non-player options first
		if (name === "name") {
			setUnityAppPayload((prev) => ({ ...prev, name: value }));
			return;
		}

		if (type === "file") {
			setFiles(files);
		} else if (e.target.type === "checkbox") {
			setPlayerOption(checked)
		} else if (e.target.type === "number") {
			setPlayerOption(Number(value))
		} else {
			setPlayerOption(value);
		}
	};

	function onClickBack() {
		if (uploadState.status === "UPLOADING") {
			alert("Please wait until the project is finished uploading before returning.");

			return;
		}

		navigate("/embed");
	}


	const elements: Array<JSX.Element> = useMemo(() => {
		const elements = [];
		if (files) {
			for (let i = 0; i < files.length; i++) {
				elements.push(
					<p>{files[i].webkitRelativePath}</p>
				);
			}
		}

		return elements;
	}, [files]);

	return (
		<div className="project-uploader">

			<button id="back-button" onClick={onClickBack} >Back</button>

			<h2>Upload a Unity Project</h2>

			<div className="input-group">
				<h3>Path:</h3>

				<div id="filepath-previewer">
					<h3
						style={{
							backgroundColor: elements.length
								? "green"
								: "red"
						}}
					>{`${elements.length} files`}</h3>
					<div id="filepath-previewer-elements">
						{...elements}
					</div>
				</div>

				<input
					id="folder-selector"
					type="file"
					style={{ marginLeft: "10px" }}
					webkitdirectory=""
					onChange={handleChange}
				/>
			</div>

			<div className="input-group">
				<h3>Name:</h3>
				<input
					type="text"
					placeholder="Clinic Sim"
					name="name"
					value={unityAppPayload.name}
					onChange={handleChange}
				/>
			</div>

			<div className="input-group">
				<h3>Initial Dimensions:</h3>
				<input
					type="number"
					placeholder="1280"
					value={unityAppPayload.playerOptions.embedWidth}
					name="embedWidth"
					onChange={handleChange}
				/>{" "}
				x{" "}
				<input
					type="number"
					placeholder="720"
					value={unityAppPayload.playerOptions.embedHeight}
					name="embedHeight"
					onChange={handleChange}
				/>
			</div>

			<div className="checkbox-group">
				<label>
					<input
						type="checkbox"
						name="allowResizing"
						onChange={handleChange}
						checked={
							unityAppPayload.playerOptions.allowResizing
						}
					/>
					Allow Resizing
				</label>
			</div>

			<div className="checkbox-group">
				<label>
					<input
						type="checkbox"
						name="allowFullscreen"
						onChange={handleChange}
						checked={
							unityAppPayload.playerOptions.allowFullscreen
						}
					/>
					Allow Fullscreen
				</label>
			</div>

			<div className="checkbox-group">
				<label>
					<input
						type="checkbox"
						name="showFPS"
						onChange={handleChange}
						checked={unityAppPayload.playerOptions.showFPS}
					/>
					Show FPS
				</label>
			</div>

			<div className="checkbox-group">
				<label>
					<input
						type="checkbox"
						name="allowReloading"
						onChange={handleChange}
						checked={
							unityAppPayload.playerOptions.allowReloading
						}
					/>
					Allow Reloading
				</label>
			</div>

			<button onClick={handleUploadClick} disabled={uploadState.status === "UPLOADING"}>
				Upload
			</button>

			{
				uploadState.status === "UPLOADING" ?
					(
						<div id="upload-box">
							<span>{`Uploading File (${uploadState.currentFileIndex + 1}/${uploadState.fileCount})`}</span>
							<span>{`${uploadState.currentFileName} (${uploadState.currentChunkIndex + 1}/${uploadState.chunkCount})`}</span>
						</div>
					)
					: <></>}
		</div>
	);
}

export default ProjectUploader;
