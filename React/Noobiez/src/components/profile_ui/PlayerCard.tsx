import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { PlayerData } from "../context/playerContext";
import useMatchUpdate from "../../hooks/useMatchUpdate";

const PlayerCard = ({
  gameName,
  tagLine,
  profileIconId,
  puuid,
}: PlayerData) => {
  const { isLoading, fetchMatches } = useMatchUpdate();

  const handleUpdate = () => {
    fetchMatches(puuid);
  };
  return (
    <Card maxW="sm" align="center" color="teal" bg="blackAlpha.700">
      <CardBody width="100%">
        <Flex direction="column" align="center">
          <Image
            boxSize="200px"
            src={`https://ddragon.leagueoflegends.com/cdn/14.7.1/img/profileicon/${profileIconId}.png`}
            alt="Player Icon"
            borderRadius="lg"
          />
          <HStack mt="6" spacing="3">
            <Heading size="md" color="teal.200">
              {gameName}
            </Heading>
            <Heading size="md" color="teal.600">
              #{tagLine}
            </Heading>
          </HStack>
        </Flex>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="50">
          <Button
            onClick={handleUpdate}
            isLoading={isLoading}
            loadingText="Updating"
            variant="solid"
            colorScheme="teal"
          >
            Update
          </Button>
          <Button variant="solid" colorScheme="teal">
            Live Game
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default PlayerCard;
