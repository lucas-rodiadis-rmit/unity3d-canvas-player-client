import { UnityConfig } from '../../types/UnityConfig';
import { UnityInstance, UnityWindow } from '../../types/UnityInstance';

/**
 * Reusable function to load Unity WebGL instance.
 */
async function loadUnityInstance({
	canvas,
	config,
	onProgress,
	onLoaded
}: {
	canvas: HTMLCanvasElement;
	config: UnityConfig;
	onProgress: (progress: number) => void;
	onLoaded: (instance: UnityInstance) => void;
}): Promise<void> {
	const loaderUrl =
		config.buildUrl + "/buildweb.loader.js";
	console.log(`Using Unity loader from ${loaderUrl}`);

	return new Promise<void>((resolve, reject) => {
		const script = document.createElement("script");
		script.src = loaderUrl;

		script.onload = async () => {
			const createUnityInstance = (
				window as UnityWindow
			).createUnityInstance;

			if (!createUnityInstance) {
				const error =
					"createUnityInstance function was not found in the loader js.";
				console.error(error);
				reject(error);
				return;
			}

			try {
				const unityInstance =
					await createUnityInstance(
						canvas,
						{ ...config },
						onProgress
					);
				onLoaded(unityInstance);
				resolve();
			} catch (err) {
				alert(err);
				reject(err);
			}
		};

		script.onerror = () => {
			const error = `Failed to load Unity loader script at ${loaderUrl}`;
			console.error(error);
			reject(error);
		};

		document.body.appendChild(script);
	});
}

export default loadUnityInstance;