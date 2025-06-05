import { useState } from "react";
import type { UnityInstance } from "../types/UnityInstance"; // adjust the import path as needed
import "./ControlBar.css";
import MenuModal from "./utils/MenuModal";

interface ControlBarProps {
	unityInstance: UnityInstance | null;
	makeFullScreen: () => void;
	setShowUnityPlayer?: (show: boolean) => void;
	quitUnity: () => Promise<void>;
	setLoading: (loading: boolean) => void;
}

function ControlBar({
	unityInstance,
	makeFullScreen,
	setShowUnityPlayer,
	quitUnity,
	setLoading
}: ControlBarProps) {
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
		// Unity Player Control Bar Element
		<div
			className={`control-bar-group ${visible ? "visible" : "hidden"}`}
		>
			{/* Inner Unity Player Control Bar */}
			<div
				className={`unity-player-control-bar ${visible ? "fade-in" : "fade-out"}`}
			>
				{/* Left section with FPS and ID */}
				<div className="left-section">
					<span>FPS: 30</span>
					<div className="divider"></div>
					<span>s1234567</span>
				</div>

				{/* Center section with logo */}
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

				{/* Right section with icons */}
				<div className="right-section">
					<button
						className="icon-button"
						title="Restart"
						onClick={() => {
							// Reload the page to restart the Unity instance
							window.location.reload();
						}}
						aria-label="Restart"
					>
						<img
							className="icon"
							title="Restart"
							alt=""
							src={`/images/reload-icon.png`}
						/>
					</button>
					<div className="divider"></div>
					{/* Fullscreen Button */}
					<button
						className="icon-button"
						title="Fullscreen"
						onClick={() => makeFullScreen()}
						aria-label="Fullscreen"
					>
						<img
							className="icon"
							title="Fullscreen"
							alt=""
							src={`/images/fullscreen-icon.png`}
						/>
					</button>
					<div className="divider"></div>
					{/* Menu Button */}
					<button
						className="icon-button"
						title="Menu"
						onClick={() => setModalOpen(true)}
						aria-label="Menu"
					>
						<img
							className="icon"
							title="Menu"
							alt=""
							src={`/images/options-icon.png`}
						/>
					</button>
					<div className="divider"></div>
					{/* Close Button */}
					<button
						className="icon-button"
						title="Close"
						onClick={async () => {
							// Need to check if unityInstance is defined before quitting
							// to prevent errors 
							if (
								unityInstance !== null
							) {
								setLoading(true);
								quitUnity()
									.catch((error) => {
										// handle error if needed
										console.error(
											"Error quitting Unity instance: ",
											error
										);
									})
									.finally(() => {
										setLoading(false);
									});
								setShowUnityPlayer?.(false);
							}
						}}
						aria-label="Close"
					>
						<img
							className="icon"
							src={`/images/cross-icon.png`}
							alt=""
						/>
					</button>
				</div>
			</div>
			<div
				className={`control-bar-toggle-button ${visible ? "opened" : "closed"}`}
				onClick={toggleVisible}
			></div>

			{/* Modal for menu options */}
			<MenuModal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				onResize={handleResize}
			/>
		</div>
	);
}

export default ControlBar;
