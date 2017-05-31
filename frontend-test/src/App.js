import React from 'react';
import $ from 'jquery';


//List all Tasks
class AllTasks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
        };
        this.completeTask = this.completeTask.bind(this);
        this.fetchTask = this.fetchTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
    }

    fetchTasks(){
      // return $.getJSON('http://flask-todo-peter-tascio-joelbcastillo.c9users.io/tasks')
      return $.getJSON('http://0.0.0.0:8080/tasks')
      .then((data) => {
        this.setState({ tasks: data.tasks });
      });
    }

    fetchTask(id){
      return $.getJSON(`http://0.0.0.0:8080/tasks/${id}`)
      .then((data) => {
        this.setState({ tasks: data.task });
      });

    }

    completeTask(id){
      $.ajax({
        type: 'PATCH',
        url: `http://0.0.0.0:8080/tasks/${id}`,
        success: function(){
          this.fetchTasks();
        }.bind(this)
      });

    }

    componentDidMount() {
      this.fetchTasks();
    }

    render() {
      let assignClass;
      let button1;
      let button2;
        const allTasks = this.state.tasks.map((task, i) => {
          if (task.done){
            assignClass = 'task-complete';
            button1 = <button>Delete Task</button>;
            button2 = <p></p>;
          }else {
            assignClass = 'not-done';
            button1 = <button onClick={() => this.fetchTask(task.id)}>Show This Task</button>;
            button2 = <button onClick={() => this.completeTask(task.id)}>Mark "{task.title}" Completed</button>;
          }
           return( <div key={i} className={assignClass}>
            <h3 >{task.title}</h3>
            <p>{task.description}</p>
            {button1}
            {button2}

        </div>
      );
        });
        return(
          <div>{allTasks}
            <TaskForm />
          </div>
        );
    }
}
//end list all tasks

//create Task Form
class TaskForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      description: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitState = this.submitState.bind(this);
  }

  handleChange(e){
    e.preventDefault();
    let name = e.currentTarget.name;
    let input = e.currentTarget.value;
    this.setState({
      [name]: input
    });
  }

  submitState(){
    var data = {
      'title': this.state.title,
      'description': this.state.description
    };

    $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:8080/tasks',
    data: JSON.stringify(data),
    contentType: 'application/json;charset=UTF-8'
  });
  }

  render(){
    return(
      <div>
        <form>
          <label>Title</label>
          <input name="title" onChange={this.handleChange}/>
          <label>Description</label>
          <textarea name="description" onChange={this.handleChange}></textarea>
          <button onClick={this.submitState}>Submit Task</button>
        </form>
      </div>
    );
  }
}
//end Create Task Form

export default AllTasks;
