import { ChangeEvent, useState } from "react";
import "./ProjectUploader.css";

function ProjectUploader() {
	// Stores and updates data input
	const [selectedFile, setSelectedFile] =
		useState<File | null>(null);
	const [projectName, setProjectName] = useState("");
	const [width, setWidth] = useState<number>(0);
	const [height, setHeight] = useState<number>(0);
	// Handles file selection
	const handleFileChange = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		if (!event.currentTarget.files) return;
		if (event.currentTarget.files.length > 0) {
			if (!event.currentTarget.files[0]) return;
			setSelectedFile(event.currentTarget.files[0]);
		} else {
			setSelectedFile(null);
		}
	};

	const handleUploadClick = () => {
		// Show alerts if anything is missing or invalid
		if (!selectedFile) {
			alert("Please select a file.");
			return;
		}
		if (!projectName.trim()) {
			alert("Please enter a project name.");
			return;
		}
		if (
			!width ||
			Number(width) <= 0 ||
			!height ||
			Number(height) <= 0
		) {
			alert(
				"Width and Height must be positive numbers."
			);
			return;
		}
	};

	return (
		<div className="project-uploader">
			<h2>Upload a Unity Project</h2>

			<div className="input-group">
				<h3>Path:</h3>
				<input
					type="text"
					placeholder="/home/user/ClinicSim"
					value={
						selectedFile
							? selectedFile.name
							: ""
					}
					readOnly
				/>
				<input
					type="file"
					onChange={handleFileChange}
					style={{ marginLeft: "10px" }}
				/>
			</div>

			<div className="input-group">
				<h3>Name:</h3>
				<input
					type="text"
					placeholder="Clinic Sim"
					value={projectName}
					onChange={(e) =>
						setProjectName(e.target.value)
					}
				/>
			</div>

			<div className="input-group">
				<h3>Initial Dimensions:</h3>
				<input
					type="number"
					placeholder="1280"
					value={width}
					onChange={(e) =>
						setWidth(Number(e.target.value))
					}
				/>{" "}
				x{" "}
				<input
					type="number"
					placeholder="720"
					value={height}
					onChange={(e) =>
						setHeight(Number(e.target.value))
					}
				/>
			</div>

			<div className="checkbox-group">
				<label>
					<input type="checkbox" />
					Allow Resizing
				</label>
			</div>

			<div className="checkbox-group">
				<label>
					<input type="checkbox" />
					Allow Fullscreen
				</label>
			</div>

			<div className="checkbox-group">
				<label>
					<input type="checkbox" />
					Show FPS
				</label>
			</div>

			<div className="checkbox-group">
				<label>
					<input type="checkbox" />
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
