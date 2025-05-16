import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
	process.env = loadEnv(mode, process.cwd(), "");

	const baseUrl = process.env.VITE_CLIENT_URL_BASE;
	if (!baseUrl) {
		if (baseUrl === undefined) {
			throw Error(
				`VITE_CLIENT_URL_BASE was not set from environment variables. This must be set in order to continue.`
			);
		} else {
			throw Error(
				`Invalid VITE_CLIENT_URL_BASE set from environment variables: ${baseUrl}`
			);
		}
	}

	return defineConfig({
		base: baseUrl,
		plugins: [react()]
	});
};
