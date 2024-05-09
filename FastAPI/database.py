import sqlite3
import pandas as pd
import numpy as np
from sqlite3 import Error
from typing import Any, Dict, List
from database_operations.utility.MatchDataProcessor import MatchDataProcessor
from database_operations.utility.MatchDataOperations import *

style_to_perks = {
    "8100": [8112, 8124, 8128, 9923, 8126, 8139, 8143, 8135, 8138, 8136, 8120, 8134, 8105, 8106],
    "8300": [8351, 8360, 8369, 8306, 8304, 8313, 8321, 8316, 8345, 8347, 8410, 8352],
    "8000": [8005, 8008, 8021, 8010, 9101, 9111, 8009, 9104, 9105, 9103, 8014, 8017, 8299],
    "8400": [8437, 8439, 8465, 8446, 8463, 8401, 8429, 8444, 8473, 8451, 8453, 8242],
    "8200": [8214, 8229, 8230, 8224, 8226, 8275, 8210, 8234, 8233, 8237, 8232, 8236]
}


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

        # Sort games by gameCreation in descending order
        games = sorted(games, key=lambda x: x["matchInfo"]["gameCreation"], reverse=True)

        
        return games
    except Error as e:
        print(f'Fetching error from Noobiez Database: {e}')
    finally:
        conn.close()


def load_data_specialist():
    conn = create_connection()
    if conn is None:
        print("Error! cannot create the database connection.")
        return pd.DataFrame()  # Return an empty DataFrame on failure

    query = '''
    SELECT puuid, riotIdGameName, championId, win, primaryPerk0, primaryPerk1, primaryPerk2, primaryPerk3, subPerk0, subPerk1, primaryStyle, subStyle
    FROM participants
    '''
    df = pd.read_sql_query(query, conn)
    conn.close()
    return df


def find_proficient_players_for_all_champions():
    df = load_data_specialist()
    if df.empty:
        return []

    # Calculate win rates
    df['win_count'] = df['win']
    stats = df.groupby(['puuid', 'championId']).agg({
        'riotIdGameName': 'first',
        'win': 'sum',
        'win_count': 'count'
    }).rename(columns={'win': 'wins', 'win_count': 'games'})

    stats['win_rate'] = ((stats['wins'] / stats['games']) * 100).round(2)

    # Filter for proficient players
    proficient_df = stats[(stats['games'] >= 3) & (stats['win_rate'] >= 52)]

    # Prepare the output
    proficient_df = proficient_df.reset_index()
    proficient_df = proficient_df[['puuid', 'riotIdGameName', 'championId', 'games', 'wins', 'win_rate']]
    
    # Order by championId
    proficient_df = proficient_df.sort_values(by='championId')

    mastery_list = find_popular_perks(proficient_df)

    specialist_data = {
        "proficientPlayers": proficient_df.to_dict('records'),  # Convert DataFrame to list of dicts
        "masteryData": mastery_list
    }

    return specialist_data


def find_popular_perks(proficient_df):
    if proficient_df.empty:
        return []

    # Load the full participants data
    full_df = load_data_specialist()
    if full_df.empty:
        return []

    # Merge to filter only proficient player data
    proficient_data = full_df.merge(proficient_df[['puuid', 'championId']], on=['puuid', 'championId'])

    # Determine the most popular primary and sub styles for each champion
    popular_styles = proficient_data.groupby('championId').agg({
        'primaryStyle': lambda x: int(x.mode().iloc[0]) if not x.mode().empty else None,
        'subStyle': lambda x: int(x.mode().iloc[0]) if not x.mode().empty else None
    }).reset_index()

    results = []

    # For each champion, find the most popular primary and sub perks for the most popular styles
    for index, row in popular_styles.iterrows():
        champion_id = int(row['championId']) if row['championId'] is not None else None
        primary_style = int(row['primaryStyle']) if row['primaryStyle'] is not None else None
        sub_style = int(row['subStyle']) if row['subStyle'] is not None else None

        if primary_style is None or sub_style is None:
            continue  # Skip if no popular style was found

        # Filter the proficient dataframe for this champion and style
        champ_df = proficient_data[(proficient_data['championId'] == champion_id) & 
                                   (proficient_data['primaryStyle'] == primary_style) & 
                                   (proficient_data['subStyle'] == sub_style)]

        primary_perks = {}
        sub_perks = {}

        for col in ['primaryPerk0', 'primaryPerk1', 'primaryPerk2', 'primaryPerk3']:
            mode_result = champ_df[col].mode()
            if not mode_result.empty:
                primary_perks[col] = int(mode_result.iloc[0])

        for col in ['subPerk0', 'subPerk1']:
            mode_result = champ_df[col].mode()
            if not mode_result.empty:
                sub_perks[col] = int(mode_result.iloc[0])

        if not primary_perks or not sub_perks:
            continue  # Skip if no popular perks were found

        result = {
            'championId': champion_id,
            'primaryStyle': primary_style,
            **primary_perks,
            'subStyle': sub_style,
            **sub_perks
        }
        # Convert all numpy.int64 and similar types to Python native types for JSON serialization
        results.append({k: v.item() if isinstance(v, np.generic) else v for k, v in result.items()})

    return results

