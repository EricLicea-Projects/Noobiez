import { VStack } from "@chakra-ui/react";
import SidebarButton from "./SidebarButton";

const buttonNames = ["Home", "Profiles", "Stats"];

const SideBar = () => {
  return (
    <VStack align="stretch">
      {buttonNames.map((name) => (
        <SidebarButton key={name} name={name} />
      ))}
    </VStack>
  );
};

export default SideBar;
