import { useEffect, useRef } from "react";

import "./UnityPlayer.css";

import useCurrentSize from "../hooks/useCurrentSize";
import UnityConfig from "../types/UnityConfig";

export const defaultBuildUrl: string = "/ClinicSim/Build";
export const defaultLoaderUrl: string =
	defaultBuildUrl + "/buildweb.loader.js";

interface UnityPlayerProps {
	// The Unity config
	config: UnityConfig;
}

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

		const getLoader = async () => {
			const loaderUrl: string =
				(config.buildUrl + "/buildweb.loader.js").replace("//", "/");
			console.log(`Importing loader from ${loaderUrl}`)
			try {
				var loader = await import(/* @vite-ignore */ loaderUrl);
			}
			catch (message) {
				console.error("Unable to import loader.\n", message);
				return;
			}

			if (!loader.createUnityInstance) {
				console.error(
					"createUnityInstance function was not found in the loader js."
				);
				return;
			}

			try {
				await loader.createUnityInstance(
					canvasRef.current,
					{ ...config },
					() => { }
				);
			} catch (message) {
				alert(message);
			}
		};

		getLoader();
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
