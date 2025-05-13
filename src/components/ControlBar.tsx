import { useState } from "react";
import "./ControlBar.css";
import {config} from "../config/config";

const PUBLIC_RESOURCES_URL: string = config.PUBLIC_URL;

function MakeFullScreen() {
	window.parent.postMessage(
		{
			subject: "requestFullWindowLaunch",
			data: {
				url: "https://canvasunityplayer.hudini.online/unity-player",
				placement: "course_navigation",
				launchType: "same_window",
				launchOptions: {
					width: 1000,
					height: 800
				}
			}
		},
		"*"
	);
}

function ControlBar() {
	const [visible, setVisible] = useState(true);
	const toggleVisible = () => setVisible(!visible);

	return (
		<div>
			{!visible && (
				<div
					className="center-section"
					onClick={toggleVisible}
				>
					<div className="logo">
						<img
							src={`${PUBLIC_RESOURCES_URL}unity-logo.png`}
							alt="Unity"
							style={{
								height: "36px",
								cursor: "pointer"
							}}
						/>
					</div>
				</div>
			)}

			{visible && (
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
								src={`${PUBLIC_RESOURCES_URL}unity-logo.png`}
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
							src={`${PUBLIC_RESOURCES_URL}reload-icon.png`}
						/>
						<div className="divider"></div>
						<img
							className="icon"
							title="Fullscreen"
							src={`${PUBLIC_RESOURCES_URL}fullscreen-icon.png`}
							onClick={MakeFullScreen}
						></img>
						<div className="divider"></div>
						<img
							className="icon"
							title="Menu"
							src={`${PUBLIC_RESOURCES_URL}options-icon.png`}
						></img>
						<div className="divider"></div>
						<img
							className="icon"
							title="Close"
							src={`${PUBLIC_RESOURCES_URL}cross-icon.png`}
						></img>
						<div className="divider"></div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ControlBar;
