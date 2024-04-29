export interface Perks {
  perkIds: number[];
  perkStyle: number;
  perkSubStyle: number;
}

export interface Bans {
  championId: number;
  teamId: number;
  pickTurn: number;
}

export interface Participant {
  puuid: string;
  teamId: number;
  spell1Id: number;
  spell2Id: number;
  championId: number;
  profileIconId: number;
  riotId: string;
  bot: boolean;
  summonerId: string;
  gameCustomizationObjects: any[];
  perks: Perks;
}

interface Observers {
  encryptionKey: string;
}

export interface LiveData {
  gameId: number;
  mapId: number;
  gameMode: string;
  gameType: string;
  gameQueueConfigId: number;
  participants: Participant[];
  observers: Observers;
  platformId: string;
  bannedChampions: Bans[];
  gameStartTime: number;
  gameLength: number;
}
