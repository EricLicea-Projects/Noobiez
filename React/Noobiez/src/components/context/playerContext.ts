import { createContext } from "react";

export interface PlayerData {
  puuid: string;
  accountId: string;
  summonerId: string;
  gameName: string;
  tagLine: string;
  profileIconId: number;
  summonerLevel: number;
  tier: string;
  rank: string;
}

interface PlayerContextType {
  playerData: PlayerData | null;
  setPlayerData: React.Dispatch<React.SetStateAction<PlayerData | null>>;
}

const defaultPlayerContextValue: PlayerContextType = {
  playerData: null,
  setPlayerData: () => {},
};

const PlayerContext = createContext<PlayerContextType>(
  defaultPlayerContextValue
);

export default PlayerContext;
