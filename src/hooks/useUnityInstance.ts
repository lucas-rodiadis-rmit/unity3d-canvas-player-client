import { useCallback, useState } from "react";
import type { UnityInstance } from "../types/UnityInstance"; // adjust if needed

export const useUnityInstance = () => {
	// State to hold the Unity instance
	const [unityInstance, setUnityInstance] =
		useState<UnityInstance | null>(null);

	const [fetchLoading, setFetchLoading] = useState(false);

	// State to manage loading progress and loading state
	const [loadingProgress, setLoadingProgress] =
		useState<number>(0);

	// State to manage loading state
	const [projectIsLoading, setProjectIsLoading] =
		useState<boolean>(true);

	// State to control visibility of the Unity player
	const [showUnityPlayer, setShowUnityPlayer] =
		useState<boolean>(true);

	// Function to handle progress updates from the Unity instance
	const handleProgress = (progress: number) => {
		setLoadingProgress(progress);
		if (progress >= 0.95) {
			setTimeout(
				() => setProjectIsLoading(false),
				300
			); // smooth fadeout
		}
	};

	// Function to make the Unity instance full screen
	const makeFullScreen = useCallback(() => {
		if (unityInstance !== null) {
			unityInstance.SetFullscreen(1);
		}
	}, [unityInstance]);

	// Function to quit the Unity instance
	const quitUnity =
		useCallback(async (): Promise<void> => {
			if (unityInstance) {
				setFetchLoading(true);
				await unityInstance
					.Quit()
					.catch((error) => {
						throw error;
					})
					.finally(() => {
						setFetchLoading(false);
					});
				setShowUnityPlayer(false);
			}
		}, [unityInstance]);

	// Function to refresh the Unity instance
	const refreshUnity = useCallback(
		async (window: Window): Promise<void> => {
			// Reload the page
			window.location.reload();
		},
		[]
	);

	return {
		unityInstance,
		showUnityPlayer,
		setShowUnityPlayer,
		fetchLoading,
		setFetchLoading,
		loadingProgress,
		isLoading: projectIsLoading,
		handleProgress,
		setUnityInstance,
		makeFullScreen,
		quitUnity,
		refreshUnity
	};
};
