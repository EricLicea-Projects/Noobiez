// MatchCardKdaRatio.tsx
import { Text } from "@chakra-ui/react";

interface MatchCardKdaRatioProps {
  kdaRatio: number;
}

const MatchCardKdaRatio = ({ kdaRatio }: MatchCardKdaRatioProps) => {
  const getColorForKda = (kda: number) => {
    if (kda >= 7) return "teal.200";
    if (kda >= 4) return "purple.200";
    return "green.50";
  };

  const formattedKdaRatio = kdaRatio.toFixed(1);
  const kdaColor = getColorForKda(kdaRatio);

  return (
    <Text fontSize="sm" fontWeight="semibold" color={kdaColor}>
      {formattedKdaRatio} KDA
    </Text>
  );
};

export default MatchCardKdaRatio;
