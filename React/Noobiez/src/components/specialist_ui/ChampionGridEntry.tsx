import { Box, VStack, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Mastery, ProficientPlayers } from "../../types/specialistTypes"; // Adjust path as necessary

interface ChampionGridEntryProps {
  mastery: Mastery & { name: string };
  proficientPlayers: ProficientPlayers[];
}

const ChampionGridEntry = ({
  mastery,
  proficientPlayers,
}: ChampionGridEntryProps) => {
  return (
    <Box
      as={Link}
      to={`/OTP/${mastery.championId}`}
      state={{ mastery, proficientPlayers }}
      _hover={{ transform: "scale(1.1)", transition: "transform .2s" }}
    >
      <VStack>
        <Image
          src={`/champion/${mastery.championId}.png`}
          alt={mastery.name || "Champion"}
          boxSize="100px"
          objectFit="cover"
          borderRadius="md"
        />
        <Text>{mastery.name}</Text>
      </VStack>
    </Box>
  );
};

export default ChampionGridEntry;
