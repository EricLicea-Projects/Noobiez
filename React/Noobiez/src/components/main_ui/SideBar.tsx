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
  { path: "/OTP", name: "Specialists" },
];

const SideBar = () => {
  const { playerData } = useContext(PlayerContext);

  return (
    <VStack>
      {routes.map((route) => {
        // Conditionally render buttons based on playerData
        if (
          route.name === "Home" ||
          route.name === "Specialists" ||
          playerData
        ) {
          return (
            <Link
              to={route.path}
              key={route.name}
              style={{
                pointerEvents: "auto",
              }}
            >
              <SidebarButton name={route.name} disabled={false} />
            </Link>
          );
        }
        return null; // Do not render the button if playerData is not present and the route requires it
      })}
    </VStack>
  );
};

export default SideBar;
