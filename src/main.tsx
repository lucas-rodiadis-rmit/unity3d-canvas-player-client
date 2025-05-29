// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";

// import './index.css';

import {
	BrowserRouter,
	Route,
	Routes
} from "react-router-dom";

import App from "./App.tsx";
import EmbedSelection from "./pages/EmbedSelection.tsx";
import ProjectUploader from "./pages/ProjectUploader.tsx";
import XMLGenerator from "./pages/XMLGenerator.tsx";

declare global {
	interface Window {
		LOCAL_DATA: { newToken?: string; returnUrl?: string };
	}
}

ReactDOM.createRoot(
	document.getElementById("root")!
).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<>
							Homepage -- there is nothing
							here yet.
						</>
					}
				/>
				<Route
					path="/register"
					element={<XMLGenerator />}
				/>
				<Route
					path="/unity-player/:project_id"
					element={<App />}
				/>
				<Route
					path="/embed"
					element={<EmbedSelection />}
				/>
				<Route
					path="*"
					element={<>Invalid route.</>}
				/>
				<Route
					path="/upload"
					element={<ProjectUploader />}
				/>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
