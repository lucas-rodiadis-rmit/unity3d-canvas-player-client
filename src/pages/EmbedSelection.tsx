
// <head>
// 	<meta charset="utf-8" />
// 	<title>Insert Unity3D Player</title>
//

import { pingAPI } from "../hooks/useApi";

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
	async function submitEmbedData(useIFrame: boolean) {

		if (!window.LOCAL_DATA.token) {
			alert("No token available. Try refreshing the page.");
			return;
		}

		const embedRequest: CreateEmbedPayload = {
			token: window.LOCAL_DATA.token,
			presentation_type: useIFrame ? "iframe" : "frame",
			project_id: "test123456",
			width: useIFrame ? 1067 : undefined,
			height: useIFrame ? 600 : undefined,
		};

		try {
			const data = await pingAPI({ method: "POST", endpoint: "embed", body: embedRequest });
			console.debug("Data received: ", data);
		}
		catch (error) {
			console.error("Unable to submit embed data: ", error);
		}
	}

	return (<>
		<h2>Embed Unity3D Player</h2>
		<p>Click the button below to embed the Unity3D Player into your Canvas content.</p>

		<button onClick={() => submitEmbedData(true)}>Embed Unity3D Player (iframe)</button>
		<button onClick={() => submitEmbedData(false)}>Embed Unity3D Player (frame)</button>
	</>
	);
}

export default EmbedSelection

/*
	const iFrameData = {
		"@context": "http://purl.imsglobal.org/ctx/lti/v1/ContentItem",
		"@graph": [
			{
				"@type": "LtiLinkItem",
				"@id": embedUrl,
				"url": embedUrl,
				"title": "Unity Player Embed",
				"text": "Play Now!",
				"mediaType": "application/vnd.ims.lti.v1.ltilink",
				"placementAdvice": {
					"presentationDocumentTarget": "iframe",
					"displayWidth": 1067,
					"displayHeight": 600
				}
			}
		]
	};

	const frameData = {
		"@context": "http://purl.imsglobal.org/ctx/lti/v1/ContentItem",
		"@graph": [
			{
				"@type": "LtiLinkItem",
				"@id": embedUrl,
				"url": embedUrl,
				"title": "Unity Player Embed",
				"text": "Play Now!",
				"mediaType": "application/vnd.ims.lti.v1.ltilink",
			}
		]
	};
*/
