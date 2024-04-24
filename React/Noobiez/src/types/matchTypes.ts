export interface Participant {
  matchId: string;
  participantId: number;
  puuid: string;
  riotIdGameName: string;
  assists: number;
  baronTakedowns: number;
  champLevel: number;
  championId: number;
  deaths: number;
  goldEarned: number;
  inhibitorTakedowns: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  kills: number;
  magicDamageDealtToChampions: number;
  magicDamageTaken: number;
  defense: number;
  flex: number;
  offense: number;
  primaryPerk0: number;
  primaryPerk1: number;
  primaryPerk2: number;
  primaryPerk3: number;
  primaryStyle: number;
  subPerk0: number;
  subPerk1: number;
  subStyle: number;
  physicalDamageDealtToChampions: number;
  physicalDamageTaken: number;
  summoner1Id: number;
  summoner2Id: number;
  summonerId: string;
  summonerLevel: number;
  teamPosition: string;
  teamId: number;
  totalDamageDealtToChampions: number;
  totalDamageTaken: number;
  totalTimeSpentDead: number;
  trueDamageDealtToChampions: number;
  trueDamageTaken: number;
  turretTakedowns: number;
  visionWardsBoughtInGame: number;
  wardsKilled: number;
  wardsPlaced: number;
  neutralMinionsKilled: number;
  totalMinionsKilled: number;
  largestMultiKill: number;
  goldPerMinute: number;
  kda: number;
  killParticipation: number;
}

export interface Team {
  teamId: number;
  matchId: string;
  win: number;
  banOne: number;
  banTwo: number;
  banThree: number;
  banFour: number;
  banFive: number;
  baron: number;
  dragon: number;
  inhibitor: number;
  riftHerald: number;
  tower: number;
}

export interface MatchInfo {
  matchId: string;
  queueId: number;
  gameCreation: number;
  gameEndTimestamp: number;
}

export interface Match {
  matchInfo: MatchInfo;
  participants: Participant[];
  teams: Team[];
}

export interface MatchesApiResponse {
  matches: Match[];
}
