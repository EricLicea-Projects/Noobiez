import { Text } from "@chakra-ui/react";

interface Props {
  kills: number;
  deaths: number;
  assists: number;
}

const MatchCardKDA = ({ kills, deaths, assists }: Props) => {
  // Function to determine the kill color based on the kill count
  // const getKillColor = (kills: number) => {
  //   if (kills >= 10) return "teal.300";
  //   if (kills >= 5) return "green.200";
  //   return "green.50"; // Default color
  // };

  // Function to determine the death color based on the death count
  const getDeathColor = (deaths: number) => {
    if (deaths >= 10) return "red.700";
    if (deaths >= 5) return "red.300";
    return "green.50"; // Default color
  };

  return (
    <Text fontSize="lg" fontWeight="bold" flexWrap={"nowrap"}>
      <Text as="span">{kills}</Text>
      {" / "}
      <Text as="span" color={getDeathColor(deaths)}>
        {deaths}
      </Text>
      {" / "}
      <Text as="span">{assists}</Text>
    </Text>
  );
};

export default MatchCardKDA;
