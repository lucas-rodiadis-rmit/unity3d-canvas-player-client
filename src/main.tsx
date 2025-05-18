// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.tsx';
import XMLGenerator from './pages/XMLGenerator.tsx';
import EmbedSelection from './pages/EmbedSelection.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<>hello </>} />
				<Route path="/register" element={<XMLGenerator />} />
				<Route path="/unity-player/:project_id" element={<App />} />
				<Route path="/embed" element={<EmbedSelection />} />
				<Route path="*" element={<>Invalid route.</>} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>

);
