import sqlite3

conn = sqlite3.connect('../noobiez.db')

with open('player.sql', 'r') as f:
    sql_script = f.read()

try:
    conn.executescript(sql_script)
    print("Database init success!")
except sqlite3.Error as e:
    print(f'Error: {e}')
finally:
    conn.close()