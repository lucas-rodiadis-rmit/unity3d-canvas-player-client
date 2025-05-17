
// <head>
// 	<meta charset="utf-8" />
// 	<title>Insert Unity3D Player</title>
//

import { pingURL } from "../hooks/useApi";
import { LTIContentItem, LTIEmbedRequestMessage } from "../types/LTI";

import "./EmbedSelection.css"


// </head>
function EmbedSelection() {
	const embedUrl = "REPLACE_ME";
	const returnUrl = "REPLACE_ME";

	async function submitEmbedData(useIFrame: boolean) {
		const graph: LTIContentItem = {
			"@type": "LtiLinkItem",
			"@id": embedUrl,
			"url": embedUrl,
			"title": "Unity Player Embed",
			"text": "Play Now!",
			"mediaType": "application/vnd.ims.lti.v1.ltilink",
			"placementAdvice": { presentationDocumentTarget: "frame" }
		};

		graph.placementAdvice = useIFrame ? {
			"presentationDocumentTarget": "iframe",
			"displayWidth": 1067,
			"displayHeight": 600
		} : {
			"presentationDocumentTarget": "frame"
		}

		const embedMessage: LTIEmbedRequestMessage = {
			lti_message_type: "ContentItemSelection",
			lti_version: "LTI-1p0",
			mediaType: "application/vnd.ims.lti.v1.ltilink",
			content_items: [graph]
		};

		try {
			await pingURL({ method: "POST", endpoint: returnUrl, body: embedMessage });
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
