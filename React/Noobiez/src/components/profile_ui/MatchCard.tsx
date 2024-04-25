import { Box, HStack, Image, VStack, Text, Flex } from "@chakra-ui/react";
import { Participant } from "../../types/matchTypes";

import MatchCardPerkImage from "./MatchCardPerkImage";
import MatchCardKDA from "./MatchCardKDA";
import MatchCardKp from "./MatchCardKp";
import MatchCardKdaRatio from "./MatchCardKdaRatio";
import MatchCardWardContainer from "./MatchCardWardContainer";

const MatchCard = ({
  championId,
  summoner1Id,
  summoner2Id,
  primaryPerk0,
  subStyle,
  kills,
  deaths,
  assists,
  kda,
  killParticipation,
  item0,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  wardsPlaced,
  visionWardsBoughtInGame,
  wardsKilled,
  totalMinionsKilled,
  neutralMinionsKilled,
  goldEarned,
  turretTakedowns,
}: Participant) => {
  const champion = `/champion/${championId}.png`;
  const summoner1 = `/summoner/${summoner1Id}.png`;
  const summoner2 = `/summoner/${summoner2Id}.png`;
  const perkMain = `/perks/${primaryPerk0}.png`;
  const perkStyle = `/styles/${subStyle}.png`;
  const slot1 = `/items/${item0}.png`;
  const slot2 = `/items/${item1}.png`;
  const slot3 = `/items/${item2}.png`;
  const slot4 = `/items/${item3}.png`;
  const slot5 = `/items/${item4}.png`;
  const slot6 = `/items/${item5}.png`;
  const slot7 = `/items/${item6}.png`;
  const wards = `/assets/ward.png`;
  const controlWards = `/assets/control.png`;
  const wardsScore = `/assets/killed.png`;
  const creep = `/assets/creep.png`;
  const gold = `/assets/gold.png`;
  const tower = `/assets/tower1.png`;

  return (
    <Flex
      display="flex"
      justify={"space-between"}
      align={"center"}
      w={"450px"}
      h={"150px"}
    >
      <VStack spacing={5}>
        <HStack spacing={2}>
          <Image
            boxSize="60px"
            borderRadius="md"
            src={champion}
            alt="Champion Image"
          />
          <VStack spacing={1.5}>
            <MatchCardPerkImage src={summoner1} alt="Summoner Spell 1" />
            <MatchCardPerkImage src={summoner2} alt="Summoner Spell 2" />
          </VStack>
          <VStack spacing={1.5}>
            <MatchCardPerkImage src={perkMain} alt="Main Perk" />
            <MatchCardPerkImage src={perkStyle} alt="Sub Style" />
          </VStack>
          <VStack ml={2} spacing={1} wrap={"nowrap"}>
            <MatchCardKDA kills={kills} deaths={deaths} assists={assists} />
            <MatchCardKdaRatio kdaRatio={kda} />
            <MatchCardKp killParticipation={killParticipation} />
          </VStack>
        </HStack>
        <HStack spacing={1}>
          <MatchCardPerkImage src={slot1} alt="Slot 1" boxSize="30" />
          <MatchCardPerkImage src={slot2} alt="Slot 2" boxSize="30" />
          <MatchCardPerkImage src={slot3} alt="Slot 3" boxSize="30" />
          <MatchCardPerkImage src={slot4} alt="Slot 4" boxSize="30" />
          <MatchCardPerkImage src={slot5} alt="Slot 5" boxSize="30" />
          <MatchCardPerkImage src={slot6} alt="Slot 6" boxSize="30" />
          <MatchCardPerkImage src={slot7} alt="Slot 7" boxSize="30" />
        </HStack>
      </VStack>
      <VStack spacing={4} ml={1}>
        <MatchCardWardContainer
          src={wards}
          alt="Wards Bought"
          count={wardsPlaced}
        />
        <MatchCardWardContainer
          src={controlWards}
          alt="Control Wards Bought"
          count={visionWardsBoughtInGame}
        />
        <MatchCardWardContainer
          src={wardsScore}
          alt="Wards Killed"
          count={wardsKilled}
        />
      </VStack>
      <VStack spacing={4} ml={3} align="flex-start">
        <MatchCardWardContainer
          src={creep}
          alt="Creep Score"
          count={neutralMinionsKilled + totalMinionsKilled}
        />
        <MatchCardWardContainer
          src={tower}
          alt="Creep Score"
          count={turretTakedowns}
        />
        <MatchCardWardContainer
          src={gold}
          alt="Gold Earn"
          size="50px"
          count={goldEarned}
        />
      </VStack>
    </Flex>
  );
};

export default MatchCard;
