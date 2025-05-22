export interface LTIMessage {
	lti_message_type: string;
	lti_version: string;
	content_items: Array<LTIContentItem>;
}

export interface LTIContentItem {
	"@type": string;
	"@id": string;
	url: string;
	title: string;
	text: string;
	mediaType: string;
	placementAdvice: {
		presentationDocumentTarget: "frame" | "iframe";
		displayWidth?: number;
		displayHeight?: number;
	};
}

export interface LTIEmbedRequestMessage extends LTIMessage {
	lti_message_type: "ContentItemSelection";
	lti_version: "LTI-1p0";
	mediaType: "application/vnd.ims.lti.v1.ltilink";
	content_items: [LTIContentItem];
}
