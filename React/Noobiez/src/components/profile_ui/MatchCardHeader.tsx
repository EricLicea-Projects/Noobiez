import { HStack, Text } from "@chakra-ui/react";

import { MatchInfo } from "../../types/matchTypes";
import { queues } from "../../types/queuesTypes";

const MatchCardHeader = ({
  queueId,
  gameCreation,
  gameEndTimestamp,
  win,
}: MatchInfo) => {
  const gameDuration = () => {
    const creationSeconds = Math.floor(gameCreation / 1000);
    const endSeconds = Math.floor(gameEndTimestamp / 1000);

    const durationSeconds = endSeconds - creationSeconds;

    const minutes = Math.floor(durationSeconds / 60);
    const seconds = durationSeconds % 60;

    const formattedDuration = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;

    return formattedDuration;
  };

  const gameAge = () => {
    const currentTime = Date.now();

    const timeDifference = currentTime - gameCreation;

    const hoursSinceCreation = Math.floor(timeDifference / 1000 / 60 / 60);

    if (hoursSinceCreation < 24) {
      return `${hoursSinceCreation} hours ago`;
    } else {
      const daysSinceCreation = Math.floor(hoursSinceCreation / 24);

      if (daysSinceCreation === 1) {
        return `1 day ago`;
      }

      return `${daysSinceCreation} days ago`;
    }
  };

  return (
    <HStack
      w={"100%"}
      align={"center"}
      justify={"space-around"}
      borderBottomWidth={"2px"}
      borderColor={"linear-gradient(to right, #004545, black)"}
      borderRadius={"sm"}
    >
      <Text>{queues[queueId].name}</Text>
      <Text>Time: {gameDuration()}</Text>
      {win !== undefined && <Text>{win ? "Win" : "Lose"}</Text>}
      <Text>{gameAge()}</Text>
    </HStack>
  );
};

export default MatchCardHeader;
