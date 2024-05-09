import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerContext from "../context/playerContext";
import { usePlayerSearch } from "../../hooks/usePlayerSearch";
import { VStack, Text, Flex, Spacer, Button } from "@chakra-ui/react";
import { ProficientPlayers } from "../../types/specialistTypes";

interface ChampionMastersListProps {
  players: ProficientPlayers[];
}

const ChampionMastersList = ({ players }: ChampionMastersListProps) => {
  const navigate = useNavigate();
  const [loadingPuuid, setLoadingPuuid] = useState<string | null>(null);
  const { setPlayerData } = useContext(PlayerContext);
  const { searchPuuid } = usePlayerSearch();

  const handleClick = (puuid: string) => () => {
    setLoadingPuuid(puuid);
    searchPuuid(puuid)
      .then((newProfile) => {
        setPlayerData({ ...newProfile });
        setLoadingPuuid(null);
        navigate("/profiles");
      })
      .catch((error) => {
        console.error("Failed to fetch profile:", error);
      })
      .finally(() => {
        setLoadingPuuid(null);
      });
  };

  return (
    <VStack
      spacing={4}
      p={4}
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
      width="500px"
    >
      {players.map((player) => (
        <Flex key={player.puuid} width="full" p={2} align="center">
          <Button
            fontWeight="bold"
            width="180px"
            variant="link"
            colorScheme="teal"
            justifyContent="flex-start"
            textAlign="left"
            onClick={handleClick(player.puuid)}
            isLoading={loadingPuuid === player.puuid} // Apply loading state based on the puuid
            loadingText="Searching..."
            disabled={loadingPuuid !== null}
          >
            {player.riotIdGameName}
          </Button>
          <Spacer />
          <Text minWidth="100px" maxWidth="100px" isTruncated>
            Games: {player.games}
          </Text>
          <Spacer />
          <Text minWidth="120px" maxWidth="130px" isTruncated>
            Win Rate: {player.win_rate}%
          </Text>
        </Flex>
      ))}
    </VStack>
  );
};

export default ChampionMastersList;
