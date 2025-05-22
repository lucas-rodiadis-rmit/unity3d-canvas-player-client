export type UnityConfig = {
	buildUrl: string;
	frameworkUrl: string;
	dataUrl: string;
	codeUrl: string;
	streamingAssetsUrl: string;
	companyName: string;
	productName: string;
	productVersion: string;
	matchWebGLToCanvasSize: boolean;
	// showBanner: unityShowBanner,
};

export function DefaultUnityPlayerConfig(
	buildUrl: string
): UnityConfig {
	const config: UnityConfig = {
		buildUrl: buildUrl,
		dataUrl: buildUrl + "/buildweb.data.gz",
		frameworkUrl:
			buildUrl + "/buildweb.framework.js.gz",
		codeUrl: buildUrl + "/buildweb.wasm.gz",
		streamingAssetsUrl: "StreamingAssets",
		companyName: "RMIT",
		productName: "Nursing XR",
		productVersion: "1",
		matchWebGLToCanvasSize: false
	};

	config.buildUrl = buildUrl;
	return config;
}

export default UnityConfig;
