import sqlite3
from sqlite3 import Error
from typing import Any, Dict, List
from database_operations.utility.MatchDataProcessor import MatchDataProcessor
from database_operations.utility.MatchDataOperations import *

DATABASE = 'database_operations/noobiez.db'

def create_connection():
    conn = None
    try: 
        conn = sqlite3.connect(DATABASE)
        return conn
    except Error as e:
        print(e)
    
    return conn


def upsert_player_data(player_data):
    sql = '''
    INSERT INTO players(puuid, summonerId, accountId, gameName, tagLine, profileIconId, summonerLevel)
    VALUES(?,?,?,?,?,?,?)
    ON CONFLICT(puuid) DO UPDATE SET
    accountId=excluded.accountId,
    summonerId=excluded.summonerId,
    gameName=excluded.gameName,
    tagLine=excluded.tagLine,
    profileIconId=excluded.profileIconId,
    summonerLevel=excluded.summonerLevel;
    '''

    conn = create_connection()
    try:
        cur = conn.cursor()
        cur.execute(sql, (player_data['puuid'], player_data['summonerId'],player_data['accountId'], player_data['gameName'],
                          player_data['tagLine'], player_data['profileIconId'], player_data['summonerLevel']))
        conn.commit()
    except Error as e:
        print(f"Database error:{e}")
    finally:
        if conn:
            conn.close()


def get_player_info(name: str, tag: str):
    conn = create_connection()  # Use the connection created by create_connection
    if conn is None:
        print("Error! cannot create the database connection.")
        return None
    
    # Normalizing name and tag
    normalized_name = name.replace(' ', '').lower()
    normalized_tag = tag.replace(' ', '').lower()

    try:
        cursor = conn.cursor()
        query = '''SELECT puuid, accountId, summonerId, gameName, tagLine, profileIconId, summonerLevel
                   FROM players
                   WHERE REPLACE(LOWER(gameName), ' ', '') = ? AND REPLACE(LOWER(tagLine), ' ', '') = ?'''
        cursor.execute(query, (normalized_name, normalized_tag))
        result = cursor.fetchone()
    except sqlite3.Error as e:
        print(e)
        return None
    finally:
        if conn:
            conn.close()
    
    if result:
        print('Hello It works?')
        keys = ['puuid','accountId','summonerId','gameName', 'tagLine', 'profileIconId', 'summonerLevel']
        return dict(zip(keys, result))
    else:
        return None
    

def insert_match_data(match_json: Dict[str, Any]):
    processor = MatchDataProcessor(match_json)
    conn = create_connection()
    if conn is None:
        print('Error! Cannot create the database connection.')
        return
    
    try:
        with conn:
            insert_match(conn, processor.extract_matches())
            insert_participants(conn, processor.extract_participants())
            insert_teams(conn, processor.extract_teams())
    except Error as e:
        print(f'Match transaction has failed: {e}')
    finally:
        conn.close()


def filter_existing_matches(match_ids: List[str]) -> List[str]:
    sql = "SELECT matchId FROM matches WHERE matchId IN ({seq})".format(seq=','.join(['?']*len(match_ids)))
    conn = create_connection()
    try:
        cur = conn.cursor()
        cur.execute(sql, match_ids)
        existing_ids = {row[0] for row in cur.fetchall()}
        new_ids = [mid for mid in match_ids if mid not in existing_ids]
        return new_ids
    except Error as e:
        print(f"Database error when filtering matches: {e}")
    finally:
        if conn:
            conn.close()
    return []


def fetch_player_games(puuid):
    conn = create_connection()
    if conn is None:
        return []
    
    try:
        cursor = conn.cursor()
        
        # Query to find all matches for a given puuid
        match_query = '''
        SELECT DISTINCT p.matchId
        FROM participants p
        WHERE p.puuid = ?
        '''
        cursor.execute(match_query, (puuid,))
        match_ids = cursor.fetchall()
        
        games = []
        
        # Query to fetch basic match details for each matchId
        for (matchId,) in match_ids:
            match_details_query = '''
            SELECT matchId, queueId, gameCreation, gameEndTimestamp
            FROM matches
            WHERE matchId = ?
            '''
            cursor.execute(match_details_query, (matchId,))
            match_details = cursor.fetchone()
            matchInfo = {
                "matchId": match_details[0],
                "queueId": match_details[1],
                "gameCreation": match_details[2],
                "gameEndTimestamp": match_details[3]
            }
            
            # Query to fetch all participant details for the match
            participants_query = '''
            SELECT *
            FROM participants
            WHERE matchId = ?
            '''
            cursor.execute(participants_query, (matchId,))
            participant_rows = cursor.fetchall()
            participant_columns = [column[0] for column in cursor.description]
            participants = [{participant_columns[i]: row[i] for i in range(len(participant_columns))} for row in participant_rows]
            
            # Query to fetch all team details for the match
            teams_query = '''
            SELECT *
            FROM teams
            WHERE matchId = ?
            '''
            cursor.execute(teams_query, (matchId,))
            team_rows = cursor.fetchall()
            team_columns = [column[0] for column in cursor.description]
            teams = [{team_columns[i]: row[i] for i in range(len(team_columns))} for row in team_rows]
            
            # Combine match information with participants and teams into a structured format
            game = {
                "matchInfo": matchInfo,
                "participants": participants,
                "teams": teams
            }
            games.append(game)
        
        return games
    except Error as e:
        print(f'Fetching error from Noobiez Database: {e}')
    finally:
        conn.close()

