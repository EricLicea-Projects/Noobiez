CREATE TABLE IF NOT EXISTS players (
    puuid TEXT PRIMARY KEY,
    accountId TEXT NOT NULL,
    gameName TEXT NOT NULL,
    tagLine TEXT NOT NULL,
    profileIconId INTEGER NOT NULL,
    summonerLevel INTEGER NOT NULL
);