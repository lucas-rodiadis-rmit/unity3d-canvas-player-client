import { useEffect, useState } from "react";
import "./App.css";

import UnityPlayer, {
	DefaultUnityPlayerConfig
} from "./components/UnityPlayer";
import ControlBar from "./components/ControlBar";

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
				<ControlBar>
				</ControlBar>

				{player ? (
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
