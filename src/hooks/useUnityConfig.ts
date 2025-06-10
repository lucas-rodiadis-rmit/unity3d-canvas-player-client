import { UnityAppConfig } from "@api/types";
import { useMemo } from "react";
import useAPI from "./useApi";

function useUnityConfig(projectId: string) {
	const apiResponse = useAPI<UnityAppConfig>({
		endpoint: `unity-config/${projectId}`,
		method: "GET"
	});

	const config = useMemo((): UnityAppConfig | null => {
		if (apiResponse.status === "SUCCESS") {
			return apiResponse.data;
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
