import { useEffect, useRef } from "react";

import "./UnityPlayer.css";

import useCurrentSize from "../hooks/useCurrentSize";
import UnityConfig from "../types/UnityConfig";

export const defaultBuildUrl: string = "/ClinicSim/Build";
export const defaultLoaderUrl: string =
	defaultBuildUrl + "/buildweb.loader.js";

interface UnityPlayerProps {
	config: UnityConfig;
	setUnityInstance: React.Dispatch<
		React.SetStateAction<any | null>
	>;
}

function UnityPlayer({
	config,
	setUnityInstance
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

	/* When the page first loads, or the canvas reference changes, load the game */
	useEffect(() => {
		if (!canvasRef.current) return;

		const runLoader = async () => {
			const loaderUrl: string = (
				config.buildUrl + "/buildweb.loader.js"
			);
			console.log(
				`Using Unity loader from ${loaderUrl}`
			);

			const script = document.createElement("script");
			script.src = loaderUrl;
			script.onload = async () => {
				const createUnityInstance = (window as any)
					.createUnityInstance;

				if (!createUnityInstance) {
					console.error(
						"createUnityInstance function was not found in the loader js."
					);
					return;
				}

				try {
					await createUnityInstance(
						canvasRef.current,
						{ ...config },
						() => { }
					).then((unityInstance: any) => {
						setUnityInstance(unityInstance);
					});
				} catch (message) {
					alert(message);
				}
			};

			document.body.appendChild(script);
		};

		runLoader();
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
