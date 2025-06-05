import { useMemo, useState } from "react";

// import "./App.css";

import ControlBar from "./components/ControlBar";

import UnityPlayer from "./components/UnityPlayer";

import { useParams } from "react-router-dom";
import useAPI from "./hooks/useApi";
import UnityConfig, {
	DefaultUnityPlayerConfig
} from "./types/UnityConfig";

import "./App.css";

import LoadingBar from "./components/LoadingBar";
import { useUnityInstance } from "./hooks/useUnityInstance";

interface UnityProjectConfig {
	buildUrl: string;
}

function App() {
	const { project_id } = useParams();

	const apiResponse = useAPI<UnityProjectConfig>({
		endpoint: `unity-config/${project_id}`,
		method: "GET"
	});

	const config = useMemo((): UnityConfig | null => {
		if (apiResponse.status === "SUCCESS") {
			return DefaultUnityPlayerConfig(
				apiResponse.data.buildUrl
			);
		}

		if (apiResponse.status === "ERROR") {
			console.error(
				"Error fetching Unity project config:",
				apiResponse.message
			);
			return null;
		}

		return null;
		// Disable warning about exhaustive dependencies (we only care about status)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [apiResponse.status]);

	// Auth state for application
	const [auth, _setAuth] = useState(true);

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
			<ControlBar makeFullScreen={makeFullScreen} />
			<div className="unity-player-main">
				{apiResponse.status === "ERROR" ? (
					<div className="no-player-message">
						No player available.
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
