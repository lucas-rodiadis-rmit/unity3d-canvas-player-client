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
				<div className="icon-rotate" title="Restart"></div>
				<div className="divider"></div>
				<div className="icon-fullscreen" title="Fullscreen"></div>
				<div className="divider"></div>
				<div className="icon-menu" title="Menu"></div>
				<div className="divider"></div>
				<div className="icon-close" title="Close"></div>
			</div>
		</div>
	);
}

export default ControlBar;
