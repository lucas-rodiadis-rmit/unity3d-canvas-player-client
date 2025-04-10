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
					<img src="unity-icon.svg" alt="Unity" style={{ height: '24px' }} />
				</div>
			</div>

			<div className="right-section">
				<div className="divider"></div>
				<div className="icon" title="Restart"></div>
				<div className="divider"></div>
				<div className="icon" title="Fullscreen"></div>
				<div className="divider"></div>
				<div className="icon" title="Menu"></div>
				<div className="divider"></div>
				<div className="icon" title="Close"></div>
			</div>
		</div>
	);
}

export default ControlBar;
