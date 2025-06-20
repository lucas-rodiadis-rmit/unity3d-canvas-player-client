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
	

	// Unity instance methods and state
	const {
		showUnityPlayer,
		fetchLoading,
		quitUnity,
		refreshUnity,
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
				quitUnity={quitUnity}
				refreshUnity={refreshUnity}
			/>
			<div className="unity-player-main">
				{apiResponse.status === "ERROR" ? (
					<div className="no-player-message">
						No player available.
					</div>
				) : showUnityPlayer === false ? (
					<div className="blur-overlay">
						<div className="no-player-message-exited">
							Unity player is hidden.
						</div>
					</div>
				) : config === null || fetchLoading === true ? (
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
