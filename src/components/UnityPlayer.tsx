import { useEffect, useRef } from "react";

import "./UnityPlayer.css";

import useCurrentSize from "../hooks/useCurrentSize";
import UnityConfig from "../types/UnityConfig";
import type { UnityInstance } from "../types/UnityInstance";
import loadUnityInstance from "./utils/LoadUnityInstance";

export const defaultBuildUrl: string = "/ClinicSim/Build";
export const defaultLoaderUrl: string =
	defaultBuildUrl + "/buildweb.loader.js";

/**
 * Props for the UnityPlayer component.
 */
interface UnityPlayerProps {
	config: UnityConfig;
	setUnityInstance: React.Dispatch<
		React.SetStateAction<UnityInstance | null>
	>;
	onProgress: (progress: number) => void;
}

function UnityPlayer({
	config,
	setUnityInstance,
	onProgress
}: UnityPlayerProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(
		null
	);
	const containerRef = useRef<HTMLDivElement | null>(
		null
	);

	const { width, height } = useCurrentSize();

	config.matchWebGLToCanvasSize = false;

	useEffect(() => {
		console.log(width, height);
	}, [width, height]);

	// Load Unity instance when the component mounts
	// and when the canvasRef changes.
	useEffect(() => {
		if (!canvasRef.current) return;

		loadUnityInstance({
			canvas: canvasRef.current,
			config,
			onProgress,
			onLoaded: setUnityInstance
		});
		// Disable exhaustive-deps rule as it will cause unnecessary re-renders
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [canvasRef]);

	console.log("Re-rendering Unity Component");

	return (
		<div ref={containerRef} id="canvas-unity-player">
			<title>Canvas Unity WebGL Player</title>
			<canvas
				ref={canvasRef}
				id="unity-canvas"
				width={width}
				height={height}
			/>
		</div>
	);
}

export default UnityPlayer;
