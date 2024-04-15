import sqlite3


def insert_match(conn, match_data):
    sql = """
    INSERT INTO matches (matchId, queueId, gameCreation, gameEndTimestamp)
    VALUES (?, ?, ?, ?)
    """
    conn.execute(sql, (match_data['matchId'], match_data['queueId'], match_data['gameCreation'], match_data['gameEndTimestamp']))


def insert_participants(conn, participant_data):
    sql = """
    INSERT INTO participants (
        matchId, participantId, puuid, riotIdGameName, assists, baronTakedowns, 
        champLevel, championId, deaths, goldEarned, inhibitorTakedowns, 
        item0, item1, item2, item3, item4, item5, item6, kills, 
        magicDamageDealtToChampions, magicDamageTaken, defense, flex, 
        offense, primaryPerk0, primaryPerk1, primaryPerk2, primaryPerk3, primaryStyle, 
        subPerk0, subPerk1, subStyle, physicalDamageDealtToChampions, 
        physicalDamageTaken, summoner1Id, summoner2Id, summonerId, summonerLevel, teamPosition, teamId, 
        totalDamageDealtToChampions, totalDamageTaken, totalTimeSpentDead, 
        trueDamageDealtToChampions, trueDamageTaken, turretTakedowns, 
        visionWardsBoughtInGame, wardsKilled, wardsPlaced, neutralMinionsKilled, 
        totalMinionsKilled, largestMultiKill, goldPerMinute, kda, killParticipation
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """
    for participant in participant_data:
        conn.execute(sql, (
            participant['matchId'], participant['participantId'], participant['puuid'],
            participant['riotIdGameName'], participant['assists'], participant['baronTakedowns'],
            participant['champLevel'], participant['championId'], participant['deaths'],
            participant['goldEarned'], participant['inhibitorTakedowns'], participant['item0'],
            participant['item1'], participant['item2'], participant['item3'], participant['item4'],
            participant['item5'], participant['item6'], participant['kills'],
            participant['magicDamageDealtToChampions'], participant['magicDamageTaken'],
            participant['defense'], participant['flex'], participant['offense'],
            participant['primaryPerk0'], participant['primaryPerk1'], participant['primaryPerk2'],
            participant['primaryPerk3'], participant['primaryStyle'], participant['subPerk0'],
            participant['subPerk1'], participant['subStyle'], participant['physicalDamageDealtToChampions'],
            participant['physicalDamageTaken'], participant['summoner1Id'], participant['summoner2Id'],
            participant['summonerId'], participant['summonerLevel'], participant['teamPosition'],
            participant['teamId'], participant['totalDamageDealtToChampions'], participant['totalDamageTaken'],
            participant['totalTimeSpentDead'], participant['trueDamageDealtToChampions'],
            participant['trueDamageTaken'], participant['turretTakedowns'], participant['visionWardsBoughtInGame'],
            participant['wardsKilled'], participant['wardsPlaced'], participant['neutralMinionsKilled'],
            participant['totalMinionsKilled'], participant['largestMultiKill'], participant['goldPerMinute'],
            participant['kda'], participant['killParticipation']
        ))


def insert_teams(conn, team_data):
    sql = """
    INSERT INTO teams (
        teamId, matchId, win, banOne, banTwo, banThree, banFour, banFive, 
        baron, dragon, inhibitor, riftHerald, tower
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """
    for team in team_data:
        conn.execute(sql, (
            team['teamId'], team['matchId'], team['win'], team['banOne'],
            team['banTwo'], team['banThree'], team['banFour'], team['banFive'],
            team['baron'], team['dragon'], team['inhibitor'],
            team['riftHerald'], team['tower']
        ))
