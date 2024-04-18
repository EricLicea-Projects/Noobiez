import { Image } from "@chakra-ui/react";

interface Props {
  src: string;
  alt: string;
  boxSize?: string;
}

const MatchCardPerkImage = ({ src, alt, boxSize = "25px" }: Props) => (
  <Image boxSize={boxSize} borderRadius="md" src={src} alt={alt} />
);

export default MatchCardPerkImage;
