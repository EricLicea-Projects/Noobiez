export interface Mastery {
  championId: number;
  primaryStyle: number;
  primaryPerk0: number;
  primaryPerk1: number;
  primaryPerk2: number;
  primaryPerk3: number;
  subStyle: number;
  subPerk0: number;
  subPerk1: number;
}

export interface ProficientPlayers {
  puuid: string;
  riotIdGameName: string;
  championId: number;
  games: number;
  wins: number;
  win_rate: number;
}

export interface SpecialistData {
  proficientPlayers: ProficientPlayers[];
  masteryData: Mastery[];
}
