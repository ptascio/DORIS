import os
from flask import Flask
from flask import jsonify
from flask import abort
from flask_cors import CORS
from flask import request


app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def index():
    return "Hello!"

tasks = [
    {
        'id': 1,
        'title': u'Buy groceries',
        'description': u'Milk, Cheese, Pizza, Fruit, Tylenol',
        'done': False
    },
    {
        'id': 2,
        'title': u'Learn Python',
        'description': u'Need to find a good Python tutorial on the web',
        'done': False
    }
]

@app.route('/tasks', methods=['GET'])
def get_tasks():
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
    print request
    print request.form
    print request.json
    print request.json['title']
    print request.json['description']

    task = {
        'id': tasks[-1]['id'] + 1,
        'title': request.json['title'],
        'description': request.json['description'],
        'done': False
    }
    tasks.append(task)
    return jsonify({'tasks': [tasks]})

@app.route('/tasks/<int:task_id>', methods=['PATCH'])
def mark_task_complete(task_id):
    task = [task for task in tasks if task['id'] == task_id]
    task_index = next(index for (index, d) in enumerate(tasks) if d["id"] == task_id)
    new_task = task
    new_task[0]['done'] = True
    tasks.append(new_task[0])
    del tasks[task_index]
    return jsonify({'tasks': [tasks]})


if __name__ == '__main__':
    app.run(host=os.getenv('IP', '0.0.0.0'),port=int(os.getenv('PORT', 8080)))
