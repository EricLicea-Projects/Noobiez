import { Grid, GridItem } from "@chakra-ui/react";
import PlayerCard from "../components/profile_ui/PlayerCard";
import MatchCard from "../components/profile_ui/MatchCard";

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
        <MatchCard
          championId={17}
          summoner1Id={1}
          summoner2Id={3}
          primaryPerk0={8010}
          subStyle={8100}
          kills={10}
          deaths={10}
          assists={5}
          kdaRatio={1}
          killParticipation={0.0045}
          item0={3070}
          item1={3070}
          item2={3070}
          item3={3070}
          item4={3070}
          item5={3070}
          item6={3070}
        />
      </GridItem>
      <GridItem colSpan={1}></GridItem>
    </Grid>
  );
};

export default ProfilesPage;
