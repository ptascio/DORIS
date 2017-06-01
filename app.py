import os
from flask import Flask
from flask import jsonify
from flask import abort
from flask_cors import CORS
from flask import request
from models import *


app = Flask(__name__)
CORS(app)


def iterate_tasks(data):
    array_of_data = []
    for idx, entry in enumerate(data):
        array_of_data.append(iterate_task(data[idx]))
    return array_of_data

def iterate_task(task):
    json_data = {}
    for idx, val in enumerate(task):
        if (idx == 0):
            json_data['id'] = val
        elif (idx == 1):
            json_data['title'] = val
        elif (idx == 2):
            json_data['description'] = val
        else:
            json_data['done'] = val
            return json_data

tasks = []

@app.route('/', methods=['GET'])
def index():
    return "Hello!"

@app.route('/tasks', methods=['GET'])
def get_tasks():
    print 'in get tasks'
    tasks = fetch_all_tasks()
    tasks = iterate_tasks(tasks)
    return jsonify({'tasks': tasks})

@app.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = [task for task in tasks if task['id'] == task_id]
    if len(task) == 0:
        abort(404)
    return jsonify({'task': [task[0]]})
# request.json.get(description, ""),
@app.route('/tasks', methods=['POST'])
def create_task():
    title = request.json['title']
    description = request.json['description']
    print title
    print description
    insert_task(title, description)
    # task = {
    #     'id': tasks[-1]['id'] + 1,
    #     'title': request.json['title'],
    #     'description': request.json['description'],
    #     'done': False
    # }
    return None

@app.route('/tasks/<int:task_id>', methods=['PATCH'])
def mark_task_complete(task_id):
    task = [task for task in tasks if task['id'] == task_id]
    task_index = next(index for (index, d) in enumerate(tasks) if d["id"] == task_id)
    new_task = task
    new_task[0]['done'] = 1
    tasks.append(new_task[0])
    del tasks[task_index]
    return jsonify({'tasks': [tasks]})

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def remove_task(task_id):
    delete_task(task_id)
    print tasks
    return jsonify({'tasks': [tasks]})


if __name__ == '__main__':
    app.run(host=os.getenv('IP', '0.0.0.0'),port=int(os.getenv('PORT', 8080)))
