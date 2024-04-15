CREATE TABLE IF NOT EXISTS matches (
    matchId TEXT PRIMARY KEY,
    queueId INTEGER NOT NULL,
    gameCreation INTEGER NOT NULL,
    gameEndTimestamp INTEGER NOT NULL
);