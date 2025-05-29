import { useCallback, useState } from "react";
import type { UnityInstance } from "../types/UnityInstance"; // adjust if needed

export const useUnityInstance = () => {
	// State to hold the Unity instance
	const [unityInstance, setUnityInstance] =
		useState<UnityInstance | null>(null);

    // State to manage loading progress and loading state
	const [loadingProgress, setLoadingProgress] =
		useState<number>(0);
    // State to manage loading state
	const [isLoading, setIsLoading] = useState(true);
    // Function to handle progress updates from the Unity instance
	const handleProgress = (progress: number) => {
		setLoadingProgress(progress);
		if (progress >= 1) {
			setTimeout(() => setIsLoading(false), 300); // smooth fadeout
		}
	};

	// Function to make the Unity instance full screen
	const makeFullScreen = useCallback(() => {
		if (unityInstance !== null) {
			unityInstance.SetFullscreen(1);
		}
	}, [unityInstance]);

	return {
		unityInstance,
        loadingProgress,
        isLoading,
        handleProgress,
		setUnityInstance,
		makeFullScreen
	};
};
