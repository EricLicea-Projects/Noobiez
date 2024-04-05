import { VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SidebarButton from "./SidebarButton";

const routes = [
  { path: "/", name: "Home" },
  { path: "/profiles", name: "Profiles" },
  { path: "/stats", name: "Stats" },
];

const SideBar = () => {
  return (
    <VStack>
      {routes.map((route) => (
        <Link to={route.path} key={route.name}>
          <SidebarButton name={route.name} />
        </Link>
      ))}
    </VStack>
  );
};

export default SideBar;
