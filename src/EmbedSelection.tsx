import React, { useState } from "react";
import "./EmbedSelection.css";

const EmbedSelection: React.FC = () => {
  const [projects, setProjects] = useState(["Clinic Sim", "Other"]);
  const [selected, setSelected] = useState(projects[0]);
  const [allowFullscreen, setAllowFullscreen] = useState(false);
  const [showFPS, setShowFPS] = useState(false);

  const handleAddProject = () => {
    const name = prompt("Enter new Unity project name:");
    if (name && !projects.includes(name)) {
      setProjects([...projects, name]);
      setSelected(name);
    }
  };

  const handleSubmit = () => {
    alert(
      `Embedded: ${selected}\nFullscreen: ${allowFullscreen}\nFPS: ${showFPS}`
    );
  };

  return (
    <div className="container">
      <h1>Canvas Embed Selection</h1>

      <div className="label-row">
        Unity Projects:
      </div>

      <div className="select-container">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {projects.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <button className="plus-button" onClick={handleAddProject} />
      </div>

      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={allowFullscreen}
            onChange={() => setAllowFullscreen(!allowFullscreen)}
          />
          Allow fullscreen
        </label>
        <label>
          <input
            type="checkbox"
            checked={showFPS}
            onChange={() => setShowFPS(!showFPS)}
          />
          FPS counter
        </label>
      </div>

      <button className="button-submit" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
};

export default EmbedSelection;
