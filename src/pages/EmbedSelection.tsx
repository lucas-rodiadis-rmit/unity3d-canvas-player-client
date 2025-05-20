import useEmbedData from "../hooks/useEmbedData"
import "./EmbedSelection.css"


// TODO: Put this in a middleware package for both the front and back end
interface CreateEmbedPayload {
	token: string;

	project_id: string;
	presentation_type: "frame" | "iframe";
	width?: number;
	height?: number;

	/* OTHER OPTIONS CAN BE ADDED HERE */
	// allow_fullscreen: boolean;
}


function EmbedSelection() {
	// 
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