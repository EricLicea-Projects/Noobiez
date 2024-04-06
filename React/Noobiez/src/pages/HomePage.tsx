import { FormEvent, useState } from "react";
import { VStack, HStack, Input, Button, Heading } from "@chakra-ui/react";

const HomePage = () => {
  const [riotId, setRiotId] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(riotId);
  };
  return (
    <VStack
      spacing={4}
      align="stretch"
      justifyContent="center"
      height="100vh"
      style={{ transform: "translateY(-200px)" }}
    >
      <Heading textAlign="center" color="teal.200">
        Noobiez
      </Heading>
      <form onSubmit={handleSubmit}>
        <HStack justify="center" align="stretch">
          <Input
            placeholder="Snuggle #Snug"
            variant="outline"
            value={riotId}
            onChange={(event) => setRiotId(event.target.value)}
            mb={3}
            width="auto"
            htmlSize={30}
          />
          <Button type="submit" colorScheme="teal">
            Search
          </Button>
        </HStack>
      </form>
    </VStack>
  );
};

export default HomePage;
