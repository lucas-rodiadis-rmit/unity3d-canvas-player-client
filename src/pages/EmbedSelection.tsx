import useEmbedData from "../hooks/useEmbedData"
import "./EmbedSelection.css"

function EmbedSelection() {
	// Hook for setting data to be sent to the LMS
	const { submitEmbedData } = useEmbedData();

	return (<>
		<h2>Embed Unity3D Player</h2>
		<p>Click the button below to embed the Unity3D Player into your Canvas content.</p>

		<button onClick={() => submitEmbedData(true)}>Embed Unity3D Player (iframe)</button>
		<button onClick={() => submitEmbedData(false)}>Embed Unity3D Player (frame)</button>
	</>
	);
}

export default EmbedSelection