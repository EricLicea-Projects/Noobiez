import { Text } from "@chakra-ui/react";

interface MatchCardKpProps {
  killParticipation: number;
}

const MatchCardKp = ({ killParticipation }: MatchCardKpProps) => {
  // Function to determine color based on kill participation
  const getColorForKp = (kp: number) => {
    if (kp >= 70) return "teal.200";
    if (kp >= 50) return "purple.200";
    return "green.50";
  };

  const formattedKp = `${(killParticipation * 100).toFixed(2)}%`;
  const kpColor = getColorForKp(killParticipation);

  return (
    <Text fontSize="sm" fontWeight="semibold" color={kpColor}>
      {formattedKp} KP
    </Text>
  );
};

export default MatchCardKp;
