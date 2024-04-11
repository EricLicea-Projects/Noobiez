CREATE TABLE IF NOT EXISTS matches (
    matchId TEXT PRIMARY KEY,
    endOfGameResult TEXT NOT NULL,
    gameCreation INTEGER NOT NULL,
    gameEndTimestamp INTEGER NOT NULL,
    gameMode TEXT NOT NULL
);