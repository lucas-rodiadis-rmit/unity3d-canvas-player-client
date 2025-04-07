import { useState } from 'react'
import './App.css'

import UnityPlayer from './components/UnityPlayer';


function App() {
	const [auth, setAuth] = useState(true);

	const content = auth ?
		<UnityPlayer /> :
		<div>You are not authorised to view this content.</div>;

	return (
		<>
			<div id="main-div">
				<h1>Unity 3D Canvas Player</h1>
				{content}
			</div>
		</>
	)
}

export default App
