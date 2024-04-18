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
    >
      <GridItem area="header" bg="blackAlpha.600">
        <NavBar />
      </GridItem>
      <GridItem area="nav" bg="blackAlpha.600">
        <SideBar />
      </GridItem>
      <GridItem area="main" bg="gray.800">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default Layout;
