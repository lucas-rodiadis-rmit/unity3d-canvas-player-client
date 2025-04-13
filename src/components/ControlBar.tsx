import "./ControlBar.css";

function ControlBar() {
	return (
		<div className="unity-player-control-bar">
			<div className="left-section">
				<span>FPS: 30</span>
				<div className="divider"></div>
				<span>s1234567</span>
			</div>

			<div className="center-section">
				<div className="logo">
					<img
						src="unity-logo.png"
						alt="Unity"
						style={{ height: "36px" }}
					/>
				</div>
			</div>

			<div className="right-section">
				<img
					className="icon"
					title="Restart"
					src="reload-icon.png"
				></img>
				<div className="divider"></div>
				<img
					className="icon"
					title="Fullscreen"
					src="fullscreen-icon.png"
				></img>
				<div className="divider"></div>
				<img
					className="icon"
					title="Menu"
					src="options-icon.png"
				></img>
				<div className="divider"></div>
				<img
					className="icon"
					title="Close"
					src="cross-icon.png"
				></img>
				<div className="divider"></div>
			</div>
		</div>
	);
}

export default ControlBar;
