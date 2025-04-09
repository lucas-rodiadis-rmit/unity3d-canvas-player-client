import { useEffect, useRef } from "react";

import "./UnityPlayer.css";

import useCurrentSize from "../hooks/useCurrentSize";
import { createUnityInstance } from "./loader";

export const defaultBuildUrl: string = "/ClinicSim/Build";
export const defaultLoaderUrl: string =
	defaultBuildUrl + "/buildweb.loader.js";

export const DefaultUnityPlayerConfig = {
	dataUrl: defaultBuildUrl + "/buildweb.data.gz",
	frameworkUrl:
		defaultBuildUrl + "/buildweb.framework.js.gz",
	codeUrl: defaultBuildUrl + "/buildweb.wasm.gz",
	streamingAssetsUrl: "StreamingAssets",
	companyName: "RMIT",
	productName: "Nursing XR",
	productVersion: "1"
	// showBanner: unityShowBanner,
};

interface UnityPlayerProps {
	// The url that the build is hosted on
	url: string;

	// The Unity config
	config: any;
}

type Rect = {
	width: number;
	height: number;
};

function UnityPlayer({ config }: UnityPlayerProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(
		null
	);

	const containerRef = useRef<HTMLDivElement | null>(
		null
	);

	const { width, height } = useCurrentSize();

	/*
	const [rect, setRect] = useState<Rect>({
		width: 960,
		height: 550
	});
   */

	config.matchWebGLToCanvasSize = false;

	useEffect(() => {
		console.log(width, height);
	}, [width, height]);

	/* When the page first loads, or the canvas reference changes, load the game */
	useEffect(() => {
		if (!canvasRef.current) return;

		createUnityInstance(
			canvasRef.current,
			{ ...config },
			() => {}
		)
			.then((_unityInstance) => {})
			.catch((message) => {
				alert(message);
			});
	}, [canvasRef]);

	console.log("Re-rendering Unity Component");

	return (
		<div ref={containerRef} id="canvas-unity-player">
			<title>Unity WebGL Player | Nursing XR</title>
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
