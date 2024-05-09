import { useLocation } from "react-router-dom";
import { Mastery, ProficientPlayers } from "../../types/specialistTypes";
import ChampionMastersRuneSheet from "./ChampionMastersRuneSheet";
import { HStack } from "@chakra-ui/react";
import ChampionMastersList from "./ChampionMastersList";

interface LocationState {
  mastery: Mastery;
  proficientPlayers: ProficientPlayers[];
}

const ChampionMasters = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  return (
    <HStack spacing={0}>
      <ChampionMastersList players={state.proficientPlayers} />
      <ChampionMastersRuneSheet mastery={state.mastery} mode="Primary" />
      <ChampionMastersRuneSheet mastery={state.mastery} mode="Sub" />
    </HStack>
  );
};

export default ChampionMasters;
