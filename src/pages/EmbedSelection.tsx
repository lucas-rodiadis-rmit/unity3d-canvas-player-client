import React, { useState } from "react";
import "./EmbedSelection.css";

import useEmbedData from "../hooks/useEmbedData";

const EmbedSelection: React.FC = () => {
	const [projects, setProjects] = useState([
		"Clinic Sim",
		"Other"
	]);
	const [selected, setSelected] = useState(projects[0]);
	const [allowFullscreen, setAllowFullscreen] =
		useState(false);
	const [showFPS, setShowFPS] = useState(false);

	const handleAddProject = () => {
		const name = prompt(
			"Enter new Unity project name:"
		);
		if (name && !projects.includes(name)) {
			setProjects([...projects, name]);
			setSelected(name);
		}
	};

  // Function to submit embed data using hook
  const { submitEmbedData } = useEmbedData();
	const handleSubmit = () => {
      submitEmbedData(true);
	};

	return (
		<div className="container">
			<h1>Canvas Embed Selection</h1>

			<div className="label-row">Unity Projects:</div>

			<div className="select-container">
				<select
					value={selected}
					onChange={(e) =>
						setSelected(e.target.value)
					}
				>
					{projects.map((p) => (
						<option key={p} value={p}>
							{p}
						</option>
					))}
				</select>
				<button
					className="plus-button"
					onClick={handleAddProject}
				/>
			</div>

			<div className="checkbox-group">
				<label>
					<input
						type="checkbox"
						checked={allowFullscreen}
						onChange={() =>
							setAllowFullscreen(
								!allowFullscreen
							)
						}
					/>
					Allow fullscreen
				</label>
				<label>
					<input
						type="checkbox"
						checked={showFPS}
						onChange={() =>
							setShowFPS(!showFPS)
						}
					/>
					FPS counter
				</label>
			</div>

			<button
				className="button-submit"
				onClick={() => submitEmbedData(true)}
			>
				Add
			</button>
		</div>
	);
};

export default EmbedSelection;
