import React, { useEffect, useState } from "react";
import "./EmbedSelection.css";

import { useNavigate } from "react-router-dom";
import useAPI from "../hooks/useApi.ts";
import useEmbedData from "../hooks/useEmbedData";

import { UnityAppConfig } from "@api/types";

const EmbedSelection: React.FC = () => {
	const [selected, setSelected] = useState<
		UnityAppConfig | undefined
	>();

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

	useEffect(() => {
		if (
			selected ||
			configs.status !== "SUCCESS" ||
			!configs.data.length
		)
			return;
		setSelected(configs.data[0]);
	}, [configs.status]);

	return (
		<div className="container">
			<h1>Canvas Embed Selection</h1>

			<div className="label-row">Unity Projects:</div>

			<div className="select-container">
				<select
					value={selected?.id}
					onChange={(e) => {
						if (configs.status !== "SUCCESS") {
							console.error(
								"Bad status on configs: ",
								configs
							);
							return;
						}

						const newSelected =
							configs.data.find(
								(config) =>
									config.id ===
									e.target.value
							);
						if (!newSelected) {
							console.error(
								`Unable to find selected item "${e.target.value}"`
							);
							alert(
								"An error has occurred selecting that. Try refreshing the page."
							);
							return;
						}

						setSelected(newSelected);
					}}
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
								{p.name}
							</option>
						))
					) : (
						<></>
					)}
				</select>
				<button
					className="plus-button"
					onClick={handleAddProject}
				>
					+
				</button>
			</div>

			<div className="checkbox-group"></div>

			<button
				className="button-submit"
				onClick={() => {
					if (!selected) {
						alert(
							"No config selected to submit."
						);
						return;
					}

					submitEmbedData(selected, true);
				}}
			>
				Add
			</button>
		</div>
	);
};

export default EmbedSelection;
