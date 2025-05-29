import { useState, useCallback } from "react";
import type { UnityInstance } from "../types/UnityInstance"; // adjust if needed

export const useUnityInstance = () => {
	const [unityInstance, setUnityInstance] = useState<UnityInstance | null>(null);

	const makeFullScreen = useCallback(() => {
		if (unityInstance !== null) {
			unityInstance.SetFullscreen(1);
		}
	}, [unityInstance]);

	return { unityInstance, setUnityInstance, makeFullScreen };
};
