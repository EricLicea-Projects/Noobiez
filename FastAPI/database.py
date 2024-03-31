import sqlite3
from sqlite3 import Error

DATABASE = '/database/noobiez.db'

def create_connection():
    conn = None
    try: 
        conn = sqlite3.connect(DATABASE)
        return conn
    except Error as e:
        print(e)
    
    return conn
