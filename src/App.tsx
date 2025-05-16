import {
	JSX,
	useCallback,
	useEffect,
	useState
} from "react";
import "./App.css";

import ControlBar from "./components/ControlBar";

import UnityPlayer from "./components/UnityPlayer";

import { DefaultUnityPlayerConfig } from "./types/UnityConfig";

interface WindowConfig {
	buildUrl: string;
}

declare global {
	interface Window {
		UNITY_CONFIG: WindowConfig;
	}
}

// UnityInstance interface to define the Unity instance methods
interface UnityInstance {
	SetFullscreen: (fullscreen: number) => void;
}

function App() {
	// Auth state for application
	const [auth, _setAuth] = useState(true);
	const [player, setApp] = useState<JSX.Element | null>(
		null
	);
	
	// State for unity instance
	const [unityInstance, setUnityInstance] =
		useState<UnityInstance | null>(null);

	// Function (callback) to set fullscreen mode
	const makeFullScreen = useCallback(() => {
		if (unityInstance !== null) {
			unityInstance.SetFullscreen(1);
		}
	}, [unityInstance]);

	useEffect(() => {
		let config: WindowConfig | null = null;

		try {
			config = window.UNITY_CONFIG;
			if (!config) {
				throw ReferenceError(
					"No config available."
				);
			}
		} catch (e) {
			console.error(
				"Unable to get config from window. Error:\n",
				e
			);
			return;
		}

		if (config == null) {
			console.error(
				"Unable to use null config for Unity Player."
			);
			return;
		}

		if (!config.buildUrl) {
			console.error(
				"Invalid Build URL. Unable to create the Unity Player."
			);
			return;
		}

		setApp(
			<UnityPlayer
				config={DefaultUnityPlayerConfig(
					config.buildUrl
				)}
				setUnityInstance={setUnityInstance}
			/>
		);
	}, []);

	return (
		<>
			<div className="unity-player-main">
				<ControlBar
					makeFullScreen={makeFullScreen}
				/>

				{auth ? (
					player || (
						<div>No player available.</div>
					)
				) : (
					<div>
						You are not authorised to view this
						content.
					</div>
				)}
			</div>
		</>
	);
}

export default App;
