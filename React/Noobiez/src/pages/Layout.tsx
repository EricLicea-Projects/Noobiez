import { Outlet } from "react-router-dom";
import NavBar from "../components/main_ui/NavBar";
import SideBar from "../components/main_ui/SideBar";
import { Grid, GridItem } from "@chakra-ui/react";

const Layout = () => {
  return (
    <Grid
      h="100vh"
      templateRows="auto 1fr"
      templateColumns="200px 1fr"
      templateAreas={`
    "header header"
    "nav main"
    `}
      gap="2"
    >
      <GridItem area="header" bg="blackAlpha.300">
        <NavBar />
      </GridItem>
      <GridItem area="nav" bg="blackAlpha.300">
        <SideBar />
      </GridItem>
      <GridItem area="main" bg="blackAlpha.300">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default Layout;
