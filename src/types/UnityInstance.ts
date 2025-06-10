import { UnityInstanceOptions } from "@api/types";

/**
 * Extended Window interface to include Unity specific properties.
 */
export interface UnityWindow extends Window {
	createUnityInstance?: (
		canvas: HTMLCanvasElement,
		config: UnityInstanceOptions,
		onProgress: (progress: number) => void
	) => Promise<UnityInstance>;
}

/**
 *  Defines the UnityInstance interface, which is used to interact with Unity WebGL instances.
 */
export interface UnityInstance {
	SetFullscreen: (fullscreen: number) => void;
	Quit: () => Promise<void>;
}

