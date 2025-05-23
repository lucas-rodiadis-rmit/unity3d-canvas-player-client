import React, { useEffect, useState } from "react";
import "./EmbedSelection.css";

import useEmbedData from "../hooks/useEmbedData";
import { useNavigate } from "react-router-dom";
import { config } from "../config/config.ts";

const EmbedSelection: React.FC = () => {
	const [projects, setProjects] = useState([
		"Clinic Sim",
		"Other"
	]);

	// Make call to API to get list of projects
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await fetch(
					config.DOMAIN_URL + "api/v1/unity-config/"
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setProjects(data);
			} catch (error) {
				console.error("Error fetching projects:", error);
			}
		};

		fetchProjects();
	}, []);

	const [selected, setSelected] = useState(projects[0]);
	const [allowFullscreen, setAllowFullscreen] =
		useState(false);
	const [showFPS, setShowFPS] = useState(false);
	
	const navigate = useNavigate()
	const handleAddProject = () => {
		navigate("/upload");
	};

	// Function to submit embed data using hook
	const { submitEmbedData } = useEmbedData();

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
