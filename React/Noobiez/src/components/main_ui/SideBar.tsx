import { VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SidebarButton from "./SidebarButton";
import { useContext } from "react";
import PlayerContext from "../context/playerContext";

const routes = [
  { path: "/", name: "Home" },
  { path: "/profiles", name: "Profiles" },
  { path: "/liveGame", name: "Live Game" },
  { path: "/stats", name: "Stats" },
];

const SideBar = () => {
  const { playerData } = useContext(PlayerContext);

  return (
    <VStack>
      {routes.map((route) => (
        <Link
          to={route.path}
          key={route.name}
          style={{
            pointerEvents:
              route.name !== "Home" && !playerData ? "none" : "auto",
          }}
        >
          <SidebarButton
            name={route.name}
            disabled={route.name !== "Home" && !playerData}
          />
        </Link>
      ))}
    </VStack>
  );
};

export default SideBar;
