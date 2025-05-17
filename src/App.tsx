import {
	JSX,
	useCallback,
	useEffect,
	useMemo,
	useState
} from "react";

// import "./App.css";

import ControlBar from "./components/ControlBar";

import UnityPlayer from "./components/UnityPlayer";

import UnityConfig, { DefaultUnityPlayerConfig } from "./types/UnityConfig";
import { useParams } from "react-router-dom";
import useAPI from "./hooks/useApi";

interface UnityProjectConfig {
	buildUrl: string;
}

// UnityInstance interface to define the Unity instance methods
interface UnityInstance {
	SetFullscreen: (fullscreen: number) => void;
}

function App() {
	let { project_id } = useParams();

	const apiResponse = useAPI<UnityProjectConfig>({ endpoint: `unity-config/${project_id}`, method: "GET" });

	const config = useMemo((): UnityConfig | null => {
		if (apiResponse.status === "SUCCESS") {
			return DefaultUnityPlayerConfig(apiResponse.data.buildUrl);
		}

		return null;
	}, [apiResponse.status]);

	// Auth state for application
	const [auth, _setAuth] = useState(true);

	// State for unity instance
	const [unityInstance, setUnityInstance] =
		useState<UnityInstance | null>(null);

	// Function (callback) to set fullscreen mode
	const makeFullScreen = useCallback(() => {
		if (unityInstance !== null) {
			unityInstance.SetFullscreen(1);
		}
	}, [unityInstance]);

	return (
		<div className="unity-player-main">

			{!auth ?
				<div>
					You are not authorised to view this
					content.
				</div>
				:

				config !== null ?
					<>
						<ControlBar
							makeFullScreen={makeFullScreen}
						/>
						<UnityPlayer
							config={DefaultUnityPlayerConfig(
								config.buildUrl
							)}
							setUnityInstance={setUnityInstance}
						/>
					</> :
					(<div>No player available.</div>)
			}
		</div>
	);
}

export default App;
