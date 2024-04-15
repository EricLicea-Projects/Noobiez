import sqlite3
import os

# Connect to the SQLite database
conn = sqlite3.connect('../noobiez.db')

# Loop through each file in the current directory
for filename in os.listdir('.'):  # '.' refers to the current directory
    if filename.endswith(".sql"):  # Check if the file is an SQL file
        with open(filename, 'r') as f:
            sql_script = f.read()
        
        try:
            conn.executescript(sql_script)
            print(f"Executed {filename} successfully!")
        except sqlite3.Error as e:
            print(f'Error executing {filename}: {e}')

# Close the database connection
conn.close()
