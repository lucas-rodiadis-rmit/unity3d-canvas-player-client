import { useMemo } from "react";
import UnityConfig, {
	DefaultUnityPlayerConfig
} from "../types/UnityConfig";
import UnityProjectConfig from "../types/UnityProjectConfig";
import useAPI from "./useApi";

function useUnityConfig(projectId: string) {
	const apiResponse = useAPI<UnityProjectConfig>({
		endpoint: `unity-config/${projectId}`,
		method: "GET"
	});

	const config = useMemo((): UnityConfig | null => {
		if (apiResponse.status === "SUCCESS") {
			return DefaultUnityPlayerConfig(
				apiResponse.data.buildUrl
			);
		}

		if (apiResponse.status === "ERROR") {
			console.error(
				"Error fetching Unity project config:",
				apiResponse.message
			);
			return null;
		}

		return null;
		// Disable warning about exhaustive dependencies (we only care about status)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [apiResponse.status]);

	return { config, apiResponse };
}

export default useUnityConfig;
