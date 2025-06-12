import { useState } from "react";

import "./XMLGenerator.css";

type XMLConfigOptions = {
	toolName: string;
	launchUrl: string;
	toolId: string;
	privacyLevel: "public" | "anonymous" | "name_only";
};

function XMLGenerator() {
	const [xmlConfig, setXmlConfig] =
		useState<XMLConfigOptions>({
			toolName: "Unity Player",
			launchUrl: window.location.origin + "/embed",
			privacyLevel: "public",
			toolId: "public"
		});

	const domainUrl: string = (() => {
		try {
			return new URL(xmlConfig.launchUrl).hostname;
		} catch (error) {
			console.error(
				"Invalid URL:",
				xmlConfig.launchUrl,
				error
			);
			return "INVALID_URL";
		}
	})();

	// Generic handler for all inputs/selects
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement
		>
	) => {
		// Get the name of the html input which was changed, and its new value
		const { name, value } = e.target;
		setXmlConfig((prev) => ({
			...prev,
			[name]: value
		}));
	};

	function copyXML() {
		const xmlText =
			document.getElementById("xmlBox")!
				.textContent || "";

		navigator.clipboard.writeText(xmlText).then(() => {
			alert("XML copied to clipboard!");
		});
	}

	return (
		<>
			<div id="xml-generator-container">
				<h1>Canvas Unity Player</h1>

				<div className="input-group">
					<label htmlFor="toolName">
						Tool Name:
					</label>
					<input
						type="text"
						name="toolName"
						value={xmlConfig.toolName}
						onChange={handleChange}
					/>
				</div>

				<div className="input-group">
					<label htmlFor="launchUrl">
						Launch URL:
					</label>
					<input
						type="text"
						name="launchUrl"
						value={xmlConfig.launchUrl}
						onChange={handleChange}
					/>
				</div>

				<div className="input-group">
					<label htmlFor="privacyLevel">
						Privacy Level:
					</label>
					<select
						name="privacyLevel"
						onChange={handleChange}
					>
						<option value="public">
							public
						</option>
						<option value="anonymous">
							anonymous
						</option>
						<option value="name_only">
							name_only
						</option>
					</select>
				</div>

				<div className="input-group">
					<label htmlFor="toolId">Tool Id:</label>
					<input
						type="text"
						name="toolId"
						value={xmlConfig.toolId}
						onChange={handleChange}
					/>
				</div>

				<div className="xml-box" id="xmlBox">
					{`<?xml version="1.0" encoding="UTF-8"?>
			<cartridge_basiclti_link
				xmlns="http://www.imsglobal.org/xsd/imslticc_v1p0"
				xmlns:blti="http://www.imsglobal.org/xsd/imsbasiclti_v1p0"
				xmlns:lticm="http://www.imsglobal.org/xsd/imslticm_v1p0"
				xmlns:lticp="http://www.imsglobal.org/xsd/imslticp_v1p0"
				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				xsi:schemaLocation="http://www.imsglobal.org/xsd/imslticc_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticc_v1p0.xsd
                        http://www.imsglobal.org/xsd/imsbasiclti_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imsbasiclti_v1p0p1.xsd
                        http://www.imsglobal.org/xsd/imslticm_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticm_v1p0.xsd
                        http://www.imsglobal.org/xsd/imslticp_v1p0 http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticp_v1p0.xsd">
				<blti:title>${xmlConfig.toolName}</blti:title>
				<blti:description>Test ${xmlConfig.toolName} app launch from Canvas</blti:description>
				<blti:launch_url>${xmlConfig.launchUrl}</blti:launch_url>
				<blti:icon>https://your-public-server.com/assets/icon.png</blti:icon>
				<blti:extensions platform="canvas.instructure.com">
					<lticm:property name="tool_id">${xmlConfig.toolName}</lticm:property>
					<lticm:property name="privacy_level">${xmlConfig.privacyLevel}</lticm:property>
					<lticm:property name="domain">${domainUrl}</lticm:property>
					<lticm:property name="course_navigation[enabled]">true</lticm:property>
					<lticm:property name="course_navigation[default]">enabled</lticm:property>
					<lticm:property name="course_navigation[visibility]">admins</lticm:property>
					<lticm:property name="course_navigation[label]">${xmlConfig.toolName}</lticm:property>
					<lticm:property name="course_navigation[icon_url]">
						https://your-public-server.com/assets/icon.png</lticm:property>

					<lticm:options name="editor_button">
						<lticm:property name="enabled">true</lticm:property>
					</lticm:options>

					<lticm:options name="resource_selection">
						<lticm:property name="enabled">true</lticm:property>
					</lticm:options>

					<lticm:options name="course_navigation">
						<lticm:property name="enabled">true</lticm:property>
						<lticm:property name="default">enabled</lticm:property>
						<lticm:property name="text">${xmlConfig.toolName}</lticm:property>
					</lticm:options>
				</blti:extensions>
			</cartridge_basiclti_link>`}
				</div>
				<button
					className="copy-button"
					onClick={copyXML}
				>
					Copy XML
				</button>

				<div className="instructions">
					{/* TODO: Add more thorough and clear instructions, preferably with videos, gifs, pictures and other media to assist */}
					<h3>How To Use:</h3>
					<ol>
						<li>
							Fill the form (leave as default
							unless required)
						</li>
						<li>Click Generate XML</li>
						<li>Click Copy XML</li>
						<li>
							Paste XML into Canvas Shell as a
							LTI 1.1 External Tool/App
						</li>
					</ol>
				</div>
			</div>
		</>
	);
}

export default XMLGenerator;
