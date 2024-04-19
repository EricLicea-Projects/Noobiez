CREATE TABLE IF NOT EXISTS players (
    puuid TEXT PRIMARY KEY,
    accountId TEXT NOT NULL,
    summonerId TEXT NOT NUll,
    gameName TEXT NOT NULL,
    tagLine TEXT NOT NULL,
    profileIconId INTEGER NOT NULL,
    summonerLevel INTEGER NOT NULL
);