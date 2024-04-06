import { Grid, GridItem } from "@chakra-ui/react";
import PlayerCard from "../components/profile_ui/PlayerCard";

const data = {
  gameName: "Mizumi Ichitani",
  tagLine: "Miz",
  profileIconId: 5563,
  summonerLevel: 417,
};

const ProfilesPage = () => {
  return (
    <Grid h="100%" templateColumns="repeat(4, 1fr)" gap={2}>
      <GridItem colSpan={1}>
        <PlayerCard
          gameName={data.gameName}
          tagLine={data.tagLine}
          profileIconId={data.profileIconId}
        />
      </GridItem>
      <GridItem colSpan={2}>
        <PlayerCard
          gameName={data.gameName}
          tagLine={data.tagLine}
          profileIconId={data.profileIconId}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <PlayerCard
          gameName={data.gameName}
          tagLine={data.tagLine}
          profileIconId={data.profileIconId}
        />
      </GridItem>
    </Grid>
  );
};

export default ProfilesPage;
