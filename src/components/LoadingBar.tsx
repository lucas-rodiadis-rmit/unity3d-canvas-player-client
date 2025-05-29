import React from "react";

interface LoadingBarProps {
	progress: number; // 0 to 1
}

const LoadingBar: React.FC<LoadingBarProps> = ({ progress }) => {
	return (
		<div className="loading-container">
			<div className="loading-bar">
				<div
					className="loading-bar-fill"
					style={{ width: `${progress * 100}%` }}
				/>
			</div>
			<span>{Math.round(progress * 100)}%</span>
		</div>
	);
};

export default LoadingBar;
