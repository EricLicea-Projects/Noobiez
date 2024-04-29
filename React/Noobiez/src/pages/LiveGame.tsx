import { useContext } from "react";
import { HStack, VStack, Text, Fade, Image } from "@chakra-ui/react";
import useFetchLiveData from "../hooks/useFetchLiveData";

import { queues } from "../types/queuesTypes";
import PlayerContext from "../components/context/playerContext";
import LiveGamePlayerList from "../components/liveGameUI/LiveCardPlayerList";
import LiveCardBanList from "../components/liveGameUI/LiveCardBanList";
import LiveGameTimer from "../components/liveGameUI/LiveGameTimer";

const LiveGame = () => {
  const { playerData } = useContext(PlayerContext);
  const { data, loading, error } = useFetchLiveData(playerData?.puuid);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!data || error) {
    return (
      <VStack spacing={8} align="center" bg={"blackAlpha.800"} h={"100%"}>
        <Fade in={true} delay={0.4}>
          <Image
            src="logos/poroSleep.gif"
            boxSize="280px"
            alt="Taking a break"
          />
        </Fade>
        <Fade in={true} delay={0.5}>
          <Text fontSize="2xl" fontWeight="bold" color="teal.100">
            Looks like {playerData?.gameName} is taking a break!
          </Text>
        </Fade>
      </VStack>
    );
  }

  const hasBans = data.bannedChampions && data.bannedChampions.length > 0;

  return (
    <VStack
      spacing={0}
      width={"1270px"}
      mt={7}
      ml={230}
      borderWidth={1}
      borderRadius={"lg"}
      borderColor="transparent"
      background={`linear-gradient(to right, darkcyan, black, black, maroon), linear-gradient(to right, darkcyan, #002424, black)`}
      backgroundClip="content-box, border-box"
    >
      <HStack p={1} spacing={40}>
        {hasBans && (
          <LiveCardBanList
            champions={data.bannedChampions.slice(0, 5)}
            title="Bans:"
          />
        )}

        <Text mr={10}>{queues[data.gameQueueConfigId].name}</Text>
        <LiveGameTimer initialSeconds={data.gameLength} />
        {hasBans && (
          <LiveCardBanList
            champions={data.bannedChampions.slice(5, 10)}
            title="Bans:"
          />
        )}
      </HStack>

      <LiveGamePlayerList
        participants={data.participants}
        background={`linear-gradient(to top right, darkcyan, #002424, black), linear-gradient(to right, darkcyan, #002424, black)`}
        start={0}
        end={5}
      />

      <LiveGamePlayerList
        participants={data.participants}
        background={`linear-gradient(to bottom right, maroon, #1c0000, black), linear-gradient(to right, maroon, #1c0000, black)`}
        start={5}
        end={10}
      />
    </VStack>
  );
};

export default LiveGame;
