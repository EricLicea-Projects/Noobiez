import { HStack, VStack } from "@chakra-ui/react";
import { Participant } from "../../types/matchTypes";
import MatchCardParticipant from "./MatchCardParticipant";

interface Props {
  participants: Participant[];
}

const MatchCardTeamContainer = ({ participants }: Props) => {
  const firstFive = participants.slice(0, 5);
  const lastFive = participants.slice(5, 10);

  return (
    <HStack h={"150px"}>
      <VStack spacing={1} align={"start"}>
        {firstFive.map((participant) => (
          <MatchCardParticipant
            key={participant.participantId}
            participant={participant}
          />
        ))}
      </VStack>
      <VStack spacing={1} align={"end"} ml={5}>
        {lastFive.map((participant) => (
          <MatchCardParticipant
            key={participant.participantId}
            participant={participant}
            reverse={true}
          />
        ))}
      </VStack>
    </HStack>
  );
};

export default MatchCardTeamContainer;
