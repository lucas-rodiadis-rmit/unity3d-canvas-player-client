import { pingURL } from "./useApi";

function useEmbedData() {
	const submitEmbedData = async (useIFrame: boolean) => {
		if (
			!window.LOCAL_DATA.token ||
			!window.LOCAL_DATA.returnUrl
		) {
			alert(
				"Missing token or return URL. Try refreshing the page."
			);
			return;
		}

		// TODO: Replace with appID query param with selected app
		const embedUrl =
			window.location.origin + "/unity-player" + "?test123456"; 
		
		const contentItems = {
			"@context":
				"http://purl.imsglobal.org/ctx/lti/v1/ContentItem",
			"@graph": [
				{
					"@type": "LtiLinkItem",
					"@id": embedUrl,
					url: embedUrl,
					title: "Unity Player Embed",
					text: "Play Now!",
					mediaType:
						"application/vnd.ims.lti.v1.ltilink",
					placementAdvice: {
						presentationDocumentTarget:
							useIFrame ? "iframe" : "frame",
						...(useIFrame && {
							displayWidth: 1067,
							displayHeight: 600
						})
					}
				}
			]
		};

		const formData = new URLSearchParams({
			lti_message_type: "ContentItemSelection",
			lti_version: "LTI-1p0",
			content_items: JSON.stringify(contentItems),
			token: window.LOCAL_DATA.token
		});

		try {
			const data = await pingURL({
				method: "POST",
				endpoint: window.LOCAL_DATA.returnUrl, // Full URL to POST to
				// headers: {
				// 	"Content-Type":
				// 		"application/x-www-form-urlencoded"
				// },
				body: formData.toString()
			});

			console.debug("Content item submitted:", data);
		} catch (error) {
			console.error(
				"Failed to submit content item:",
				error
			);
		}
	};

	return { submitEmbedData };
}

export default useEmbedData;
