import { useState } from "react";
import "./ControlBar.css";

interface ControlBarProps {
	// Function to set fullscreen mode
	makeFullScreen: () => void;
}

function ControlBar({ makeFullScreen }: ControlBarProps) {
	// State for control bar visibility
	const [visible, setVisible] = useState(true);
	const toggleVisible = () => setVisible(!visible);

	return (
		<div className={`control-bar-group ${visible ? "visible" : "hidden"}`}>
			<div className={`unity-player-control-bar ${visible ? "fade-in" : "fade-out"}`}>
				<div className="left-section">
					<span>FPS: 30</span>
					<div className="divider"></div>
					<span>s1234567</span>
				</div>

				<div
					className="center-section"
					onClick={toggleVisible}
				>
					<div className="logo">
						<img
							src={`/images//unity-logo.png`}
							alt="Unity"
							style={{
								height: "36px",
								cursor: "pointer"
							}}
						/>
					</div>
				</div>

				<div className="right-section">
					<img
						className="icon"
						title="Restart"
						src={`/images/reload-icon.png`}
					/>
					<div className="divider"></div>
					<img
						className="icon"
						title="Fullscreen"
						src={`/images/fullscreen-icon.png`}
						onClick={() => makeFullScreen()}
					></img>
					<div className="divider"></div>
					<img
						className="icon"
						title="Menu"
						src={`/images/options-icon.png`}
					></img>
					<div className="divider"></div>
					<img
						className="icon"
						title="Close"
						src={`/images/cross-icon.png`}
					></img>
				</div>
			</div>
			<div className={`control-bar-toggle-button ${visible ? "opened" : "closed"}`} onClick={toggleVisible} ></div>
		</div>
	);
}

export default ControlBar;
