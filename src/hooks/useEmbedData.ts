import { UnityAppConfig } from "@api/types";
import { config } from "../config/config";

/**
 * This function is used to hide and submit embedding data for Unity3D Player in Canvas LMS.
 */
function submitLTIForm({
	contentItems,
	returnUrl
}: {
	contentItems: object;
	returnUrl: string;
}) {
	const form = document.createElement("form");
	form.method = "POST";
	form.action = returnUrl;

	const addHiddenInput = (
		name: string,
		value: string
	) => {
		const input = document.createElement("input");
		input.type = "hidden";
		input.name = name;
		input.value = value;
		form.appendChild(input);
	};

	addHiddenInput(
		"lti_message_type",
		"ContentItemSelection"
	);
	addHiddenInput("lti_version", "LTI-1p0");
	addHiddenInput(
		"content_items",
		JSON.stringify(contentItems)
	);

	document.body.appendChild(form);
	form.submit();
}

/**
 * Hook to handle embedding data for Unity3D Player in Canvas LMS
 */
function useEmbedData() {
	const submitEmbedData = (
		appConfig: UnityAppConfig,
		useIFrame: boolean
	) => {
		if (
			!window.LOCAL_DATA.newToken ||
			!window.LOCAL_DATA.returnUrl
		) {
			alert(
				"Missing token or return URL. Try refreshing the page."
			);
			return;
		}

		const embedUrl = `${config.DOMAIN_URL}unity-player/${appConfig.id}`;

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

		submitLTIForm({
			contentItems,
			returnUrl: window.LOCAL_DATA.returnUrl
		});
	};

	return { submitEmbedData };
}

export default useEmbedData;
