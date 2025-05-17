// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmbedSelection from './pages/EmbedSelection.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				{/* <Route path="/xml" element={<XmlGenerator />} /> */}
				<Route path="/embed" element={<EmbedSelection />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>

);
