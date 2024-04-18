import { Box, HStack, Image, VStack } from "@chakra-ui/react";

import MatchCardPerkImage from "./MatchCardPerkImage";
import MatchCardKDA from "./MatchCardKDA";
import MatchCardKp from "./MatchCardKp";
import MatchCardKdaRatio from "./MatchCardKdaRatio";

interface Props {
  championId: number;
  summoner1Id: number;
  summoner2Id: number;
  primaryPerk0: number;
  subStyle: number;
  kills: number;
  deaths: number;
  assists: number;
  kdaRatio: number;
  killParticipation: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
}

const MatchCard = ({
  championId,
  summoner1Id,
  summoner2Id,
  primaryPerk0,
  subStyle,
  kills,
  deaths,
  assists,
  kdaRatio,
  killParticipation,
  item0,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
}: Props) => {
  const champion = `/champion/${championId}.png`;
  const summoner1 = `/summoner/${summoner1Id}.png`;
  const summoner2 = `/summoner/${summoner2Id}.png`;
  const perkMain = `/perks/${primaryPerk0}.png`;
  const perkStyle = `/styles/${subStyle}.png`;
  const slot1 = `/items/${item0}.png`;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      boxShadow="md"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.200"
      w="full"
    >
      <VStack spacing={0.5} align="start">
        <HStack spacing={1}>
          <Image
            boxSize="60px"
            borderRadius="md"
            src={champion}
            alt="Champion Image"
          />
          <VStack spacing={1}>
            <MatchCardPerkImage src={summoner1} alt="Summoner Spell 1" />
            <MatchCardPerkImage src={summoner2} alt="Summoner Spell 2" />
          </VStack>
          <VStack spacing={1}>
            <MatchCardPerkImage src={perkMain} alt="Main Perk" />
            <MatchCardPerkImage src={perkStyle} alt="Sub Style" />
          </VStack>
          <VStack ml={2} spacing={0}>
            <MatchCardKDA kills={kills} deaths={deaths} assists={assists} />
            <MatchCardKdaRatio kdaRatio={kdaRatio} />
            <MatchCardKp killParticipation={killParticipation} />
          </VStack>
        </HStack>
        <HStack spacing={0.5}>
          <MatchCardPerkImage src={slot1} alt="Slot 1" boxSize="30" />
          <MatchCardPerkImage src={slot1} alt="Slot 1" boxSize="30" />
          <MatchCardPerkImage src={slot1} alt="Slot 1" boxSize="30" />
          <MatchCardPerkImage src={slot1} alt="Slot 1" boxSize="30" />
          <MatchCardPerkImage src={slot1} alt="Slot 1" boxSize="30" />
          <MatchCardPerkImage src={slot1} alt="Slot 1" boxSize="30" />
          <MatchCardPerkImage src={slot1} alt="Slot 1" boxSize="30" />
        </HStack>
      </VStack>
    </Box>
  );
};

export default MatchCard;
