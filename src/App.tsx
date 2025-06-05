import { useState } from "react";
import { useParams } from "react-router-dom";

import ControlBar from "./components/ControlBar";
import LoadingBar from "./components/LoadingBar";
import UnityPlayer from "./components/UnityPlayer";
import useUnityConfig from "./hooks/useUnityConfig";
import { useUnityInstance } from "./hooks/useUnityInstance";

import "./App.css";

function App() {
	const { project_id } = useParams();

	// Fetch Unity project configuration
	const { config, apiResponse } = useUnityConfig(
		project_id ? project_id : ""
	);

	// Auth state for application
	const [auth, _setAuth] = useState(true);

	// State to control visibility of the Unity player
	const [showUnityPlayer, setShowUnityPlayer] =
		useState(true);

	// Unity instance methods and state
	const {
		setUnityInstance,
		makeFullScreen,
		isLoading,
		loadingProgress,
		handleProgress
	} = useUnityInstance();

	if (!auth)
		return (
			<div>
				You are not authorised to view this content.
			</div>
		);

	return (
		<>
			<ControlBar
				makeFullScreen={makeFullScreen}
				setShowUnityPlayer={setShowUnityPlayer}
			/>
			<div className="unity-player-main">
				{apiResponse.status === "ERROR" ? (
					<div className="no-player-message">
						No player available.
					</div>
				) : showUnityPlayer === false ? (
					<div className="no-player-message-exited">
						Unity player is hidden.
					</div>
				) : config === null ? (
					<div className="loading-overlay">
						<div className="loading-circle" />
					</div>
				) : (
					<>
						<UnityPlayer
							config={config}
							setUnityInstance={
								setUnityInstance
							}
							onProgress={handleProgress}
						/>
						{isLoading && (
							<div className="loading-overlay">
								<LoadingBar
									progress={
										loadingProgress
									}
								/>
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
}

export default App;
