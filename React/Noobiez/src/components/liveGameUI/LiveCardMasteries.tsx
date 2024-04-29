import { HStack, Image } from "@chakra-ui/react";
import { Perks } from "../../types/liveTypes";

interface LiveCardMasteriesProps {
  perks: Perks;
  type: string;
}

const getImagesToMap = (perks: Perks, type: string) => {
  switch (type) {
    case "sub":
      return perks.perkIds.slice(4, 6); // Sub-images
    case "rune":
      return perks.perkIds.slice(6, 9); // Rune images
    default:
      return perks.perkIds.slice(0, 4); // Primary images
  }
};

const LiveCardMasteries = ({ perks, type }: LiveCardMasteriesProps) => {
  const imagesToMap = getImagesToMap(perks, type);

  return (
    <HStack spacing={1}>
      {imagesToMap.map((mastery, index) => {
        const isDefaultCase = type !== "sub" && type !== "rune";

        return (
          <Image
            key={mastery}
            src={`/perks/${mastery}.png`}
            boxSize={isDefaultCase && index === 0 ? "60px" : "40px"}
            alt={`Perk ${mastery}`}
            bg="blackAlpha.700"
            border="2px"
            borderColor="blackAlpha.700"
            borderRadius="full"
          />
        );
      })}
    </HStack>
  );
};

export default LiveCardMasteries;
