import { HStack, Image, Text } from "@chakra-ui/react";
import { Bans } from "../../types/liveTypes";

interface Props {
  champions: Bans[];
  title: string;
}

const LiveCardBanList = ({ champions, title }: Props) => {
  if (champions.length === 0) return null;

  return (
    <HStack spacing={0.5}>
      <Text mr={1}>{title}</Text>
      {champions.map((champ) => (
        <Image
          key={champ.championId}
          src={`/champion/${champ.championId}.png`}
          boxSize="40px"
          alt={`Banned Champion ${champ.championId}`}
        />
      ))}
    </HStack>
  );
};

export default LiveCardBanList;
