import { Grid, GridItem } from "@chakra-ui/react";

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
      <GridItem area="header" bg="blue.200">
        Header
      </GridItem>
      <GridItem area="nav" bg="green.200">
        Nav
      </GridItem>
      <GridItem area="main" bg="red.200">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
