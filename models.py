import sqlite3 as sql


def insert_task(title, description):
    con = sql.connect("database.db")
    cur = con.cursor()
    cur.execute("INSERT INTO tasks (title, description) VALUES (?,?)", (title, description))
    con.commit()
    con.close()

def fetch_all_tasks():
    con = sql.connect("database.db")
    cur = con.cursor()
    result = cur.execute("select * from tasks")
    return result.fetchall()
