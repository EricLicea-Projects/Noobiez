import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { VStack, Image, Box, HStack, Button } from "@chakra-ui/react";

import { usePlayerSearch } from "../../hooks/usePlayerSearch";
import { Perks } from "../../types/liveTypes";
import LiveCardMasteries from "./LiveCardMasteries";
import PlayerContext from "../context/playerContext";

interface Props {
  src: string;
  puuid: string;
  riotID: string;
  perks: Perks;
  spell1: number;
  spell2: number;
}

const LiveCard = ({ src, riotID, perks, spell1, spell2, puuid }: Props) => {
  const navigate = useNavigate();
  const { setPlayerData } = useContext(PlayerContext);
  const { searchPuuid } = usePlayerSearch();

  const handleClick = async () => {
    const newProfile = await searchPuuid(puuid);
    setPlayerData({ ...newProfile });
    navigate("/profiles");
  };

  return (
    <Box p={4} w="250px">
      <VStack spacing={4} mb={4}>
        <Image
          src={src}
          alt={`${src} Image`}
          boxSize="100px"
          borderRadius="lg"
        />
        <Button
          colorScheme="teal"
          variant="link"
          fontSize="lg"
          fontWeight="bold"
          onClick={handleClick}
        >
          {riotID}
        </Button>
      </VStack>
      <VStack spacing={1} align={"flex-start"}>
        <HStack alignSelf={"center"}>
          <Image
            src={`/summoner/${spell1}.png`}
            boxSize={"40px"}
            border="2px"
            borderColor="blackAlpha.800"
          />
          <Image
            src={`/summoner/${spell2}.png`}
            boxSize={"40px"}
            border="2px"
            borderColor="blackAlpha.800"
          />
        </HStack>
        <LiveCardMasteries perks={perks} type="primary" />
        <HStack spacing={3}>
          <Image
            src={`/styles/${perks.perkSubStyle}.png`}
            boxSize={"40px"}
            ml={2.5}
            border="2px"
            borderColor="blackAlpha.800"
            bg={"blackAlpha.700"}
            borderRadius="full"
          />
          <LiveCardMasteries perks={perks} type="sub" />
        </HStack>
        <HStack spacing={3}>
          <Image
            src={"/styles/Rune.png"}
            boxSize={"40px"}
            ml={2.5}
            border="2px"
            borderColor="blackAlpha.800"
            bg={"blackAlpha.700"}
            borderRadius="full"
          />
          <LiveCardMasteries perks={perks} type="rune" />
        </HStack>
      </VStack>
    </Box>
  );
};

export default LiveCard;
