import React, { useState } from "react";
import "./EmbedSelection.css";

import { useNavigate } from "react-router-dom";
import useAPI from "../hooks/useApi.ts";
import useEmbedData from "../hooks/useEmbedData";

// Based on server config
export interface UnityAppConfig {
	id: string;

	buildUrl: string;
}

const EmbedSelection: React.FC = () => {
	const [selected, setSelected] = useState<string | null>(
		null
	);
	const [allowFullscreen, setAllowFullscreen] =
		useState(false);
	const [showFPS, setShowFPS] = useState(false);

	const navigate = useNavigate();
	const handleAddProject = () => {
		navigate("/upload");
	};

	const configs = useAPI<UnityAppConfig[]>({
		method: "GET",
		endpoint: "unity-config/"
	});

	// Function to submit embed data using hook
	const { submitEmbedData } = useEmbedData();

	return (
		<div className="container">
			<h1>Canvas Embed Selection</h1>

			<div className="label-row">Unity Projects:</div>

			<div className="select-container">
				<select
					value={selected || undefined}
					onChange={(e) =>
						setSelected(e.target.value)
					}
				>
					{configs.status === "LOADING" ? (
						<p>
							Loading projects. Please wait...
						</p>
					) : configs.status === "ERROR" ? (
						<p>An unknown error has occured</p>
					) : configs.status === "SUCCESS" ? (
						configs.data.map((p) => (
							<option key={p.id} value={p.id}>
								{p.id}
							</option>
						))
					) : (
						<></>
					)}
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
