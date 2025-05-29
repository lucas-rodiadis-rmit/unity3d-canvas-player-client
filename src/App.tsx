import { useMemo, useState } from "react";

// import "./App.css";

import ControlBar from "./components/ControlBar";

import UnityPlayer from "./components/UnityPlayer";

import { useParams } from "react-router-dom";
import useAPI from "./hooks/useApi";
import UnityConfig, {
	DefaultUnityPlayerConfig
} from "./types/UnityConfig";

import { useUnityInstance } from "./hooks/useUnityInstance";

interface UnityProjectConfig {
	buildUrl: string;
}

function App() {
	let { project_id } = useParams();

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

		return null;
	}, [apiResponse.status]);

	// Auth state for application
	const [auth, _setAuth] = useState(true);

	// Unity instance methods and state
	const { setUnityInstance, makeFullScreen } =
		useUnityInstance();

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
				{config !== null ? (
					<UnityPlayer
						config={DefaultUnityPlayerConfig(
							config.buildUrl
						)}
						setUnityInstance={setUnityInstance}
					/>
				) : (
					<div>No player available.</div>
				)}
			</div>
		</>
	);
}

export default App;
