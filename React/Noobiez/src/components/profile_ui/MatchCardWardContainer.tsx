import { HStack, Text } from "@chakra-ui/react";
import MatchCardPerkImage from "./MatchCardPerkImage";

interface Props {
  src: string;
  alt: string;
  count: number;
  size?: string;
}

const MatchCardWardContainer = ({ src, alt, count, size = "20px" }: Props) => {
  return (
    <HStack spacing={2}>
      <MatchCardPerkImage src={src} alt={alt} />
      <Text fontWeight={600} width={size} textAlign="center">
        {count}
      </Text>
    </HStack>
  );
};

export default MatchCardWardContainer;
