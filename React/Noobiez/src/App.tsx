import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/main_ui/NavBar";
import SideBar from "./components/main_ui/SideBar";

function App() {
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
      <GridItem area="main" bg="red.200">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
