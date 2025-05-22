import { JSX, useMemo, useState } from "react";
import "./ProjectUploader.css";
import { pingAPI } from "../hooks/useApi";

declare module "react" {
	interface InputHTMLAttributes<T>
		extends HTMLAttributes<T> {
		webkitdirectory?: string;
	}
}

interface CreateUnityAppPayload {
	name: string;

	// Extents options
	embedWidth?: number;
	embedHeight?: number;

	// Control options
	allowResizing: boolean;
	allowFullscreen: boolean;
	allowReloading: boolean;

	files: FileList | null;

	// Analytic options
	showFPS: boolean;
}

function ProjectUploader() {
	const [unityAppPayload, setUnityAppPayload] =
		useState<CreateUnityAppPayload>({
			name: "",
			files: null,

			allowFullscreen: false,
			allowReloading: false,
			allowResizing: false,
			showFPS: false
		});

	const handleUploadClick = async () => {
		// Show alerts if anything is missing or invalid
		if (
			!unityAppPayload.files ||
			!unityAppPayload.files.length
		) {
			alert("Please select a file.");
			return;
		} else if (!unityAppPayload.name.trim()) {
			alert("Please enter a project name.");
			return;
		} else if (
			(unityAppPayload.embedWidth !== undefined &&
				unityAppPayload.embedWidth < 0) ||
			(unityAppPayload.embedHeight !== undefined &&
				unityAppPayload.embedHeight < 0)
		) {
			alert(
				"Width and Height must be positive numbers."
			);
			return;
		}


		const fd: FormData = new FormData();

		for (const [key, value] of Object.entries(unityAppPayload)) {
			if (key === "files") continue;
			fd.set(key, value);
		}

		for (let i = 0; i < unityAppPayload.files.length; i++) {
			fd.append('files', unityAppPayload.files[i]);
		}

		console.debug("Sending payload to server: ", fd);

		await pingAPI<{}>({ endpoint: "unity-config/upload", method: "POST", body: fd });
	};

	// Generic handler for all inputs/selects
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		// Get the name of the html input which was changed, and its new value
		const { name, checked, value, type, files } =
			e.target as HTMLInputElement;

		if (type === "file") {
			setUnityAppPayload((prev) => ({
				...prev,
				files
			}));
			return;
		} else if (e.target.type === "checkbox") {
			setUnityAppPayload((prev) => ({
				...prev,
				[name]: checked
			}));
		} else if (e.target.type === "number") {
			setUnityAppPayload((prev) => ({
				...prev,
				[name]: Number(value)
			}));
		} else {
			setUnityAppPayload((prev) => ({
				...prev,
				[name]: value
			}));
		}
	};

	const elements: Array<JSX.Element> = useMemo(() => {
		const elements = [];
		if (unityAppPayload.files) {
			for (let i = 0; i < unityAppPayload.files.length; i++) {
				elements.push(<p>{unityAppPayload.files[i].webkitRelativePath}</p>);
			}
		}

		return elements;
	}, [unityAppPayload.files]);

	return (
		<div className="project-uploader">
			<h2>Upload a Unity Project</h2>

			<div className="input-group">
				<h3>Path:</h3>

				<div id="filepath-previewer" >
					<h3 style={{ backgroundColor: elements.length ? "green" : "red" }} >{`${elements.length} files`}</h3>
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
					value={unityAppPayload.embedWidth}
					name="embedWidth"
					onChange={handleChange}
				/>{" "}
				x{" "}
				<input
					type="number"
					placeholder="720"
					value={unityAppPayload.embedHeight}
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
							unityAppPayload.allowResizing
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
							unityAppPayload.allowFullscreen
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
						checked={unityAppPayload.showFPS}
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
							unityAppPayload.allowReloading
						}
					/>
					Allow Reloading
				</label>
			</div>

			<button onClick={handleUploadClick}>
				Upload
			</button>
		</div>
	);
}

export default ProjectUploader;
