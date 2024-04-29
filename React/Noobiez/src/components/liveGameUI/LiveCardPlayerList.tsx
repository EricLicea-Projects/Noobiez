import { HStack } from "@chakra-ui/react";
import LiveCard from "./LiveCard";
import { Participant } from "../../types/liveTypes";

interface Props {
  participants: Participant[];
  background: string;
  start: number;
  end: number;
}

const LiveGamePlayerList = ({
  participants,
  background,
  start,
  end,
}: Props) => {
  return (
    <HStack
      spacing={1}
      borderWidth={1}
      borderRadius={"sm"}
      borderColor="transparent"
      background={background}
      backgroundClip="content-box, border-box"
    >
      {participants.slice(start, end).map((participant) => (
        <LiveCard
          key={participant.puuid}
          src={`/champion/${participant.championId}.png`}
          riotID={participant.riotId}
          puuid={participant.puuid}
          perks={participant.perks}
          spell1={participant.spell1Id}
          spell2={participant.spell2Id}
        />
      ))}
    </HStack>
  );
};

export default LiveGamePlayerList;
