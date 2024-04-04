import logo from "../../assets/main_ui/logo.png";
import { HStack, Text, Image } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <HStack spacing="18px" pl={4} pt={1}>
      <Image src={logo} alt="Logo" boxSize="50px" />
      <Text fontSize="3xl" fontWeight="bold" color="teal.200">
        Noobiez
      </Text>
    </HStack>
  );
};

export default NavBar;
