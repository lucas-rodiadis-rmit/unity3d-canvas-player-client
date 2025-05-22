import { useState } from "react";
import "./ControlBar.css";
import MenuModal from "./utils/MenuModal"; // NEW

interface ControlBarProps {
	makeFullScreen: () => void;
}

function ControlBar({ makeFullScreen }: ControlBarProps) {
	const [visible, setVisible] = useState(true);
	const [modalOpen, setModalOpen] = useState(false); // changed

	const toggleVisible = () => setVisible(!visible);

	const handleResize = (height: number) => {
		window.parent.postMessage(
			{ subject: "lti.frameResize", height },
			"*"
		);
	};

	return (
		<div className="control-bar-group">
			{!visible && (
				<div className="center-section">
					<div
						className="control-bar-toggle-button"
						onClick={toggleVisible}
					></div>
				</div>
			)}

			{visible && (
				<div className="control-bar-group">
					<div className="unity-player-control-bar">
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
								onClick={makeFullScreen}
							/>
							<div className="divider"></div>
							<img
								className="icon"
								title="Menu"
								src={`/images/options-icon.png`}
								onClick={() =>
									setModalOpen(true)
								} // updated
								style={{
									cursor: "pointer"
								}}
							/>
							<div className="divider"></div>
							<img
								className="icon"
								title="Close"
								src={`/images/cross-icon.png`}
							/>
							<div className="divider"></div>
						</div>
					</div>
					<div
						className="control-bar-toggle-button"
						onClick={toggleVisible}
					></div>
				</div>
			)}

			{/* Modal below control bar */}
			<MenuModal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				onResize={handleResize}
			/>
		</div>
	);
}

export default ControlBar;
