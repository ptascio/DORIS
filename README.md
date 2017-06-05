# ToDo App Using SQLite 3, Flask/Python and React

![home-page-image](https://github.com/ptascio/DORIS/blob/master/images/ScreenShot.jpg)

## 1. Clone This Repo
In your terminal:

```
git clone https://github.com/ptascio/DORIS.git
```

Cd into this repo.

## 2. Setup The Database
In your terminal:
```
sqlite3 database.db < schema.sql  
```

## 3. Multiple Windows
This application runs on 2 different ports and you will need to have 2 different windows open in your terminal. Simply create a new window from the directory you are currently in.

## 4. Frontend
In the new window you created cd into
```
frontend-test.
```
Run ```npm-install``` and then ```npm-start```.

## 5. Backend
In the original terminal window run ```python app.py```.

## 6. Using the App
Your app is running at ```http://localhost:3000/``` so visit that link in your favorite browser. You will be able to add, view, mark as complete and delete the tasks on your todo list.
