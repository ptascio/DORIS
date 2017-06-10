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

def toggle_complete_task(paramid, status):
    new_task_status = new_status(status)
    id = str(paramid)
    con = sql.connect("database.db")
    cur = con.cursor()
    con.execute("UPDATE tasks SET done = ? WHERE id LIKE (?)", (new_task_status, id))
    con.commit()
    con.close()

def new_status(status):
    if(status == 1):
        return 0
    else:
        return 1
