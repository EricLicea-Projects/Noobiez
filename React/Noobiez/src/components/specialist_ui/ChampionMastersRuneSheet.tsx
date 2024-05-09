import React from "react";
import { VStack, HStack, Image, Box, Text } from "@chakra-ui/react";
import { runeData } from "../../types/runeSheetType";
import { Mastery } from "../../types/specialistTypes";

interface ChampionMastersRuneSheetProps {
  mastery: Mastery;
  mode: "Primary" | "Sub";
}

interface StyleTitles {
  [key: number]: string;
}

const ChampionMastersRuneSheet: React.FC<ChampionMastersRuneSheetProps> = ({
  mastery,
  mode,
}) => {
  const styleId = mode === "Primary" ? mastery.primaryStyle : mastery.subStyle;
  const styleTitles: StyleTitles = {
    8000: "Precision",
    8100: "Domination",
    8200: "Sorcery",
    8300: "Inspiration",
    8400: "Resolve",
  };
  const styleTitle = styleTitles[styleId];

  const currentStyle = runeData[styleId];
  const activeRunes =
    mode === "Primary"
      ? [
          mastery.primaryPerk0,
          mastery.primaryPerk1,
          mastery.primaryPerk2,
          mastery.primaryPerk3,
        ]
      : [mastery.subPerk0, mastery.subPerk1];

  return (
    <VStack
      spacing={10}
      width="310px"
      height="620px"
      position="relative"
      sx={{
        "::before": {
          content: '""',
          position: "absolute",
          width: "full",
          height: "full",
          backgroundImage: `/perksBg/${styleId}.png`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          zIndex: 0,
        },
      }}
    >
      <Text fontSize="3xl" fontWeight="bold" p={4}>
        {styleTitle}
      </Text>
      {Object.entries(currentStyle).map(([rowKey, runeIds], index) => (
        <HStack key={rowKey} spacing={1} mb={3}>
          {runeIds.map((runeId: number) => (
            <Box key={runeId} p={2}>
              <Image
                src={`/perks/${runeId}.png`}
                alt={`Rune ${runeId}`}
                boxSize={index === 0 ? "65px" : "50px"}
                sx={{
                  filter: activeRunes.includes(runeId)
                    ? "grayscale(1%)"
                    : "grayscale(100%)",
                }}
              />
            </Box>
          ))}
        </HStack>
      ))}
    </VStack>
  );
};

export default ChampionMastersRuneSheet;
