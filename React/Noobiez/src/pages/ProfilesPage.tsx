import { useContext } from "react";
import {
  Grid,
  GridItem,
  Box,
  Text,
  Spinner,
  HStack,
  VStack,
} from "@chakra-ui/react"; // Added Spinner for loading
import PlayerContext from "../components/context/playerContext";
import useFetchMatches from "../hooks/useFetchMatches";
import PlayerCard from "../components/profile_ui/PlayerCard";
import MatchCard from "../components/profile_ui/MatchCard";
import MatchCardHeader from "../components/profile_ui/MatchCardHeader";

const ProfilesPage = () => {
  const { playerData } = useContext(PlayerContext);
  const { matches, isLoading, error } = useFetchMatches(playerData?.puuid);

  const findPlayerParticipant = (match) => {
    return match.participants.find(
      (participant) => participant.puuid === playerData?.puuid
    );
  };

  const renderMatches = () => {
    return matches.map((match) => {
      const playerParticipant = findPlayerParticipant(match);
      console.log(match.matchInfo.matchId);

      if (!playerParticipant) {
        return null; // Skip if there's no matching participant
      }

      return (
        <VStack key={match.matchInfo.matchId}>
          <MatchCardHeader {...match.matchInfo} />
          <MatchCard
            {...playerParticipant} // Pass the participant's data to MatchCard
          />
        </VStack>
      );
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Spinner size="lg" />{" "}
          {/* Using Spinner for better loading indication */}
        </Box>
      );
    }

    if (error) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text>Error fetching matches: {error}</Text>
        </Box>
      );
    }

    if (matches.length === 0) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text>No Player Games Available</Text>
        </Box>
      );
    }

    return renderMatches(); // Render MatchCards
  };

  return (
    <Grid h="100%" templateColumns="repeat(4, 1fr)" gap={2}>
      <GridItem colSpan={1}>
        <PlayerCard {...playerData} />
      </GridItem>
      <GridItem colSpan={2}>
        {renderContent()} {/* Cleaned up rendering logic */}
      </GridItem>
      <GridItem colSpan={1}></GridItem>
    </Grid>
  );
};

export default ProfilesPage;
