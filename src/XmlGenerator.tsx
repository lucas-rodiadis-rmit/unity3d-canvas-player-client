// XmlGenerator.tsx
import React, { useState } from 'react';
import './XmlGenerator.css';

const XmlGenerator: React.FC = () => {
  const [toolName, setToolName] = useState('Unity Player');
  const [launchUrl, setLaunchUrl] = useState('');
  const [toolId, setToolId] = useState('public');
  const [privacyLevel, setPrivacyLevel] = useState('');
  const [xml, setXml] = useState('');

  const generateXML = () => {
    const output = `<cartridge_basiclti_link xmlns="http://www.imsglobal.org/xsd/imslticc_v1p0" xmlns:blti="http://www.imsglobal.org/xsd/imsbasiclti_v1p0" xmlns:lticm="http://www.imsglobal.org/xsd/imslticm_v1p0" xmlns:lticp="http://www.imsglobal.org/xsd/imslticp_v1p0">
  <blti:title>${toolName}</blti:title>
  <blti:launch_url>${launchUrl}</blti:launch_url>
  <blti:extensions platform="canvas.instructure.com">
    <lticm:property name="tool_id">${toolId}</lticm:property>
    <lticm:property name="privacy_level">${privacyLevel}</lticm:property>
    <lticm:options name="course_navigation">
      <lticm:property name="enabled">true</lticm:property>
      <lticm:property name="text">${toolName}</lticm:property>
    </lticm:options>
  </blti:extensions>
</cartridge_basiclti_link>`;
    setXml(output);
  };

  const copyXML = () => {
    navigator.clipboard.writeText(xml);
    alert('XML copied to clipboard!');
  };

  return (
    <div className="container">
      <div>
        <h1>Canvas Unity Player</h1>

        <div className="input-group">
          <label htmlFor="toolName">Tool Name:</label>
          <input type="text" id="toolName" value={toolName} onChange={(e) => setToolName(e.target.value)} />
        </div>

        <div className="input-group">
          <label htmlFor="launchUrl">Launch URL:</label>
          <input type="text" id="launchUrl" value={launchUrl} onChange={(e) => setLaunchUrl(e.target.value)} />
        </div>

        <div className="input-group">
          <label htmlFor="toolId">Tool ID:</label>
          <select id="toolId" value={toolId} onChange={(e) => setToolId(e.target.value)}>
            <option value="public">public</option>
            <option value="anonymous">anonymous</option>
            <option value="name_only">name_only</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="privacyLevel">Privacy Level:</label>
          <input type="text" id="privacyLevel" value={privacyLevel} onChange={(e) => setPrivacyLevel(e.target.value)} />
        </div>

        <button className="button-generate" onClick={generateXML}>Generate XML</button>

        <div className="xml-box">{xml}</div>
        <button className="copy-button" onClick={copyXML}>Copy XML</button>
      </div>

      <div className="instructions">
        <h3>How To Use:</h3>
        <ol>
          <li>Fill the form</li>
          <li>Click Generate XML</li>
          <li>Click Copy XML</li>
        </ol>
      </div>
    </div>
  );
};

export default XmlGenerator;