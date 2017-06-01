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

def delete_task(paramid):
    id = str(paramid)
    print id
    con = sql.connect("database.db")
    cur = con.cursor()
    con.execute("DELETE FROM tasks WHERE id LIKE (?)", (id,))
    con.commit()
    con.close()


def fetch_task(paramid):
    id = str(paramid)
    con = sql.connect("database.db")
    cur = con.cursor()
    result = con.execute("SELECT * FROM tasks WHERE id LIKE (?)", (id,))
    return result.fetchone()
