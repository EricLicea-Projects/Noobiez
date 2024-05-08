// Import the champions mapping
import { champions } from "../../types/championTypes";
import { Link } from "react-router-dom";
import { SimpleGrid, Image, Box } from "@chakra-ui/react";

const ChampionGrid = () => {
  return (
    <SimpleGrid columns={{ base: 2, md: 5, lg: 8 }} spacing={3} p={3}>
      {Object.entries(champions).map(([id, name]) => (
        <Box
          key={id}
          as={Link}
          to={`/OTP/${id}`}
          _hover={{ transform: "scale(1.1)", transition: "transform .2s" }}
        >
          <Image
            key={id}
            src={`/champion/${id}.png`} // Assuming the public directory structure
            alt={`${name}`} // Provides a meaningful description for each image
            boxSize="100px" // Adjust size as necessary
            objectFit="cover"
            borderRadius="md" // Optional for rounded corners
            ml={10}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ChampionGrid;
