CREATE TABLE IF NOT EXISTS participants (
    matchId TEXT,
    participantId INTEGER,
    puuid TEXT NOT NULL,
    riotIdGameName TEXT NOT NULL,
    assists INTEGER NOT NULL,
    baronTakedowns INTEGER NOT NULL,
    champLevel INTEGER NOT NULL,
    championId INTEGER NOT NULL,
    deaths INTEGER NOT NULL,
    goldEarned INTEGER NOT NULL,
    inhibitorTakedowns INTEGER NOT NULL,
    item0 INTEGER NOT NULL,
    item1 INTEGER NOT NULL,
    item2 INTEGER NOT NULL,
    item3 INTEGER NOT NULL,
    item4 INTEGER NOT NULL,
    item5 INTEGER NOT NULL,
    item6 INTEGER NOT NULL,
    kills INTEGER NOT NULL,
    magicDamageDealtToChampions INTEGER NOT NULL,
    magicDamageTaken INTEGER NOT NULL,
    defense INTEGER NOT NULL,
    flex INTEGER NOT NULL,
    offense INTEGER NOT NULL,
    primaryPerk0 INTEGER NOT NULL,
    primaryPerk1 INTEGER NOT NULL,
    primaryPerk2 INTEGER NOT NULL,
    primaryPerk3 INTEGER NOT NULL,
    primaryStyle INTEGER NOT NULL,
    subPerk0 INTEGER NOT NULL,
    subPerk1 INTEGER NOT NULL,
    subStyle INTEGER NOT NULL,
    physicalDamageDealtToChampions INTEGER NOT NULL,
    physicalDamageTaken INTEGER NOT NULL,
    summoner1Id INTEGER NOT NULL,
    summoner2Id INTEGER NOT NULL,
    summonerId TEXT NOT NULL,
    summonerLevel INTEGER NOT NULL,
    teamPosition TEXT NOT NULL,
    teamId INTEGER NOT NULL,
    totalDamageDealtToChampions INTEGER NOT NULL,
    totalDamageTaken INTEGER NOT NULL,
    totalTimeSpentDead INTEGER NOT NULL,
    trueDamageDealtToChampions INTEGER NOT NULL,
    trueDamageTaken INTEGER NOT NULL,
    turretTakedowns INTEGER NOT NULL,
    visionWardsBoughtInGame INTEGER NOT NULL,
    wardsKilled INTEGER NOT NULL,
    wardsPlaced INTEGER NOT NULL,
    neutralMinionsKilled INTEGER NOT NULL,
    totalMinionsKilled INTEGER NOT NULL,
    largestMultiKill INTEGER NOT NULL,
    goldPerMinute REAL NOT NULL,
    kda REAL NOT NULL,
    killParticipation REAL NOT NULL,
    win INTEGER NOT NULL,
    firstBloodAssist INTEGER NOT NULL,
    firstBloodKill INTEGER NOT NULL,
    firstTowerAssist INTEGER NOT NULL,
    firstTowerKill INTEGER NOT NULL,

    PRIMARY KEY (matchId, participantId),
    FOREIGN KEY (matchId) REFERENCES matches(matchId)
);