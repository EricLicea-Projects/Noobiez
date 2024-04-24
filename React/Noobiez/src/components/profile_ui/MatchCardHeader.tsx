import { Box, HStack, Text } from "@chakra-ui/react";

import { MatchInfo } from "../../types/matchTypes";
import { queues } from "../../types/queuesTypes";

const MatchCardHeader = ({
  queueId,
  gameCreation,
  gameEndTimestamp,
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
    <Box>
      <HStack>
        <Text>{queues[queueId].name}</Text>
        <Text>{gameDuration()}</Text>
        <Text>{gameAge()}</Text>
      </HStack>
    </Box>
  );
};

export default MatchCardHeader;
