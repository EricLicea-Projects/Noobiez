import { FormEvent, useState, useContext, useEffect } from "react";
import {
  VStack,
  HStack,
  Input,
  Button,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { usePlayerSearch } from "../hooks/usePlayerSearch";
import PlayerContext from "../components/context/playerContext";

const HomePage = () => {
  const [riotId, setRiotId] = useState<string>("");
  const { isLoading, error, searchPlayer } = usePlayerSearch();
  const { playerData, setPlayerData } = useContext(PlayerContext);

  useEffect(() => {
    console.log("Updated playerData:", playerData);
  }, [playerData]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const player = await searchPlayer(riotId);
    console.log("Server response:", player);

    if (player && !player.error) {
      setPlayerData({ ...player });
    } else {
      console.error(
        "Error retrieving player data:",
        player?.error || "Unknown error"
      );
    }

    setRiotId("");
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
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isLoading}
            spinner={<Spinner size="md" />}
          >
            Search
          </Button>
        </HStack>
      </form>
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      )}
    </VStack>
  );
};

export default HomePage;
