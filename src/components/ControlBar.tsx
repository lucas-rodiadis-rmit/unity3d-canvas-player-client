import { useState } from "react";
import "./ControlBar.css";

function ControlBar() {
	const [visible, setVisible] = useState(true);
	const toggleVisible = () => setVisible(!visible);

	return (
		<div>
			{!visible && <div className="center-section">
				<div className="control-bar-toggle-button" onClick={toggleVisible}></div>
			</div>}

			{visible && (
				<div>
					<div className="unity-player-control-bar">
						<div className="left-section">
							<span>FPS: 30</span>
							<div className="divider"></div>
							<span>s1234567</span>
						</div>

						<div className="center-section" onClick={toggleVisible}>
							<div className="logo">
								<img
									src="unity-logo.png"
									alt="Unity"
									style={{ height: "36px", cursor: "pointer" }}
								/>
							</div>
						</div>


						<div className="right-section">
							<img className="icon" title="Restart" src="reload-icon.png" />
							<div className="divider"></div>
							<img className="icon" title="Fullscreen" src="fullscreen-icon.png" />
							<div className="divider"></div>
							<img className="icon" title="Menu" src="options-icon.png" />
							<div className="divider"></div>
							<img className="icon" title="Close" src="cross-icon.png" />
							<div className="divider"></div>
						</div>
					</div>
					<div className="control-bar-toggle-button" onClick={toggleVisible}></div>

				</div>)}
		</div>
	);
}

export default ControlBar;
