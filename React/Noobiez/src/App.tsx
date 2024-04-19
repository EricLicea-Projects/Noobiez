import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import PlayerContext, { PlayerData } from "./components/context/playerContext";

const App = () => {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  return (
    <PlayerContext.Provider value={{ playerData, setPlayerData }}>
      <RouterProvider router={router} />
    </PlayerContext.Provider>
  );
};

export default App;
