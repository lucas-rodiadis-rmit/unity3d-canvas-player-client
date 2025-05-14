import React, { useEffect, useState } from "react";
import "./App.css";

import ControlBar from "./components/ControlBar";
import UnityPlayer, {
  DefaultUnityPlayerConfig
} from "./components/UnityPlayer";

function App() {
  const auth = true;

  const [player, setPlayer] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    setPlayer(
      <UnityPlayer
        url="build"
        config={DefaultUnityPlayerConfig}
      />
    );
  }, []);

  return (
    <div className="unity-player-main">
      <ControlBar />
      {auth ? (
        player || <div>No player available.</div>
      ) : (
        <div>You are not authorised to view this content.</div>
      )}
    </div>
  );
}

export default App;
