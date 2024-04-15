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
    INSERT INTO players(puuid, accountId, gameName, tagLine, profileIconId, summonerLevel)
    VALUES(?,?,?,?,?,?)
    ON CONFLICT(puuid) DO UPDATE SET
    accountId=excluded.accountId,
    gameName=excluded.gameName,
    tagLine=excluded.tagLine,
    profileIconId=excluded.profileIconId,
    summonerLevel=excluded.summonerLevel;
    '''

    conn = create_connection()
    try:
        cur = conn.cursor()
        cur.execute(sql, (player_data['puuid'], player_data['accountId'], player_data['gameName'],
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
        query = '''SELECT puuid, gameName, tagLine, profileIconId, summonerLevel
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
        keys = ['puuid','gameName', 'tagLine', 'profileIconId', 'summonerLevel']
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
