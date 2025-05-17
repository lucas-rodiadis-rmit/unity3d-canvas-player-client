// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.tsx';
import EmbedSelection from './pages/EmbedSelection.tsx';
import XMLGenerator from './pages/XMLGenerator.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/register" element={<XMLGenerator />} />
				<Route path="/embed" element={<EmbedSelection />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>

);
