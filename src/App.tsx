import { JSX, useEffect, useRef, useState } from "react";
import "./App.css";

import ControlBar from "./components/ControlBar";
import UnityPlayer from "./components/UnityPlayer";
import UnityConfig, { DefaultUnityPlayerConfig } from "./types/UnityConfig";

function App() {
	const [auth, _setAuth] = useState(true);
	const [player, setApp] = useState<JSX.Element | null>(null);

	const defaultConfig = useRef<UnityConfig>(DefaultUnityPlayerConfig("http://localhost:3000/ClinicSim/Build"));

	useEffect(() => {
		setApp(
			<UnityPlayer config={defaultConfig.current} />
		);
	}, []);

	return (
		<>
			<div className="unity-player-main">
				<ControlBar />

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
