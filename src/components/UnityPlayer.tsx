import { useEffect, useRef, useState } from "react";

import "./UnityPlayer.css";

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

	const [rect, setRect] = useState<Rect>({
		width: 960,
		height: 550
	});

	config.matchWebGLToCanvasSize = false;

	useEffect(() => {
		if (!canvasRef.current) return;

		createUnityInstance(
			canvasRef.current,
			{ ...config },
			() => { }
		)
			.then((_unityInstance) => { })
			.catch((message) => {
				alert(message);
			});
	}, []);

	return (
		<div id="unity-player">
			<title>Unity WebGL Player | Nursing XR</title>
			<canvas
				ref={canvasRef}
				id="unity-canvas"
				onResize={() => {
					const parentRect =
						canvasRef.current?.parentElement?.getClientRects();
					if (!parentRect) {
						return;
					}

					setRect({
						width: parentRect.width,
						height: parentRect.height
					});

				}}
				width={rect.width}
				height={rect.height}
			//				width={900}
			//				height={600}
			/>
		</div>
	);
}

export default UnityPlayer;
