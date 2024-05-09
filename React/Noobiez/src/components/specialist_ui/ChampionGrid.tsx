import { SimpleGrid } from "@chakra-ui/react";
import { champions } from "../../types/championTypes";
import useFetchSpecialist from "../../hooks/useFetchSpecialist";
import ChampionGridEntry from "./ChampionGridEntry"; // Make sure the path is correct

const ChampionGrid = () => {
  const { data, loading, error } = useFetchSpecialist();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const getProficientPlayersForChampion = (championId: number) => {
    return (
      data?.proficientPlayers.filter(
        (player) => player.championId === championId
      ) || []
    );
  };

  const sortedMasteryData = data
    ? data.masteryData
        .map((mastery) => ({
          ...mastery,
          name: champions[mastery.championId.toString()],
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
    : [];

  return (
    <SimpleGrid columns={{ base: 2, md: 5, lg: 8 }} spacing={3} p={3}>
      {sortedMasteryData.map((mastery) => (
        <ChampionGridEntry
          key={mastery.championId}
          mastery={mastery}
          proficientPlayers={getProficientPlayersForChampion(
            mastery.championId
          )}
        />
      ))}
    </SimpleGrid>
  );
};

export default ChampionGrid;
