CREATE TABLE IF NOT EXISTS teams (
    teamId INTEGER,
    matchId TEXT,
    win INTEGER NOT NULL,
    banOne INTEGER,
    banTwo INTEGER,
    banThree INTEGER,
    banFour INTEGER,
    banFive INTEGER,
    baron INTEGER NOT NULL,
    dragon INTEGER NOT NULL,
    inhibitor INTEGER NOT NULL,
    riftHerald INTEGER NOT NULL,
    tower INTEGER NOT NULL,

    PRIMARY KEY (matchId, teamId),
    FOREIGN KEY (matchId) REFERENCES matches(matchId)
);