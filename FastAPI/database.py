import sqlite3
from sqlite3 import Error

DATABASE = 'database/noobiez.db'

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

    try:
        cursor = conn.cursor()
        query = '''SELECT gameName, tagLine, profileIconId, summonerLevel
                   FROM players
                   WHERE gameName = ? AND tagLine = ?'''
        cursor.execute(query, (name, tag))
        result = cursor.fetchone()
    except sqlite3.Error as e:
        print(e)
        return None
    finally:
        if conn:
            conn.close()
    
    if result:
        keys = ['gameName', 'tagLine', 'profileIconId', 'summonerLevel']
        return dict(zip(keys, result))
    else:
        return None