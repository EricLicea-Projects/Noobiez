import { HStack, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { Participant } from "../../types/matchTypes";
import MatchCardPerkImage from "./MatchCardPerkImage";
import PlayerContext from "../context/playerContext";
import { usePlayerSearch } from "../../hooks/usePlayerSearch";

interface Props {
  participant: Participant;
  reverse?: boolean;
}

const MatchCardParticipant = ({ participant, reverse }: Props) => {
  const { setPlayerData } = useContext(PlayerContext);
  const { searchPuuid } = usePlayerSearch();

  const handleClick = async () => {
    const newProfile = await searchPuuid(participant.puuid);
    setPlayerData({ ...newProfile });
  };
  return (
    <HStack
      w={"170px"}
      spacing={2}
      flexDirection={reverse ? "row-reverse" : "row"}
    >
      <MatchCardPerkImage
        src={`/champion/${participant.championId}.png`}
        alt="Champion Image"
      />

      <Button colorScheme="teal" variant={"link"} onClick={handleClick}>
        {participant.riotIdGameName}
      </Button>
    </HStack>
  );
};

export default MatchCardParticipant;
