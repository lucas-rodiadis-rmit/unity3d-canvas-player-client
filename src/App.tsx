import { useEffect, useState } from "react";
import "./App.css";

import ControlBar from "./components/ControlBar";
import UnityPlayer, {
	DefaultUnityPlayerConfig
} from "./components/UnityPlayer";

function App() {
	const [auth, setAuth] = useState(true);

	const [player, setA] = useState<React.JSX | null>(null);
	useEffect(() => {
		setA(
			<UnityPlayer
				url="build"
				config={DefaultUnityPlayerConfig}
			/>
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
