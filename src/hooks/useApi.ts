// export type APIResponse<T> = {
// 	loading: boolean = false,
// 	data: Promise<T | null>
// };

import { useEffect, useState } from "react";
import { API_URL } from "../constants";

type APIStatus = "LOADING" | "ERROR" | "SUCCESS";

interface APIResponseBase {
	status: APIStatus;
}

interface APILoading extends APIResponseBase {
	status: "LOADING";
}

interface APISuccess<T> extends APIResponseBase {
	status: "SUCCESS";
	data: T;
}

interface APIError extends APIResponseBase {
	status: "ERROR";
	message: string;
}

export type APIResponse<T> =
	| APILoading
	| APISuccess<T>
	| APIError;

const DEFAULT_API_RESPONSE: APILoading = {
	status: "LOADING"
} as const;

interface UseAPIProps {
	method: "GET" | "POST" | "DELETE";
	endpoint: string;
	body?: any | string;
}

export async function pingURL<T>({
	method = "GET",
	endpoint,
	body
}: UseAPIProps) {
	const requestOptions: RequestInit = {
		method: method,
		headers: {
			"Content-Type": "application/json"
			// ,Origin: "http://localhost:5173"
		},
		mode: "cors" // Set the mode to 'cors' for CORS request
	};

	if (body !== undefined) {
		// If it's a POST request and a body is provided, stringify and include it
		if (typeof body === "object") {
			requestOptions.body = JSON.stringify(body);
		} else {
			requestOptions.body = String(body);
		}
	}

	const res = await fetch(endpoint, requestOptions);

	if (res.ok) {
		const data: T = await res.json();

		console.debug("Received data: ", data);

		return data;
	} else {
		throw new Error(
			`HTTP error! Status: ${res.status}`
		);
	}
}

function useAPI<T>(props: UseAPIProps): APIResponse<T> {
	const [response, setResponse] = useState<
		APIResponse<T>
	>({
		...DEFAULT_API_RESPONSE
	});

	useEffect(() => {
		const URL = `${API_URL}/${props.endpoint}`;

		pingURL({
			method: props.method,
			body: props.body,
			endpoint: URL
		})
			.then((data) => {
				console.debug(
					`Received data from ${props.endpoint}`,
					data
				);
				setResponse({
					status: "SUCCESS",
					data: data as T
				});
			})
			.catch((error) => {
				console.error(
					`Error fetching from ${props.endpoint}`,
					error
				);
				setResponse({
					status: "ERROR",
					message: error
				});
			});
	}, [props.endpoint]);

	return response;
}

export default useAPI;
