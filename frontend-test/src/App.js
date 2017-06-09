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
        this.deleteTask = this.deleteTask.bind(this);
    }

    fetchTasks(){
      return $.getJSON('http://0.0.0.0:8080/tasks')
      .then((data) => {
        console.log(data.tasks);
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

    deleteTask(id){
      $.ajax({
        type: 'DELETE',
        url: `http://0.0.0.0:8080/tasks/${id}`,
        success: function(){
          this.fetchTasks();
        }.bind(this),
        error: function(){
          console.log("error");
        }
      });
    }

    componentDidMount() {
      this.fetchTasks();
    }

    render() {
      let assignClass;
      let button1;
      let button2;
      let homeButton;
      if (this.state.tasks.length === 1) {
        homeButton = <button onClick={() => this.fetchTasks()}>See All Tasks</button>;
      }else {
        homeButton = <p></p>;
      }
        const allTasks = this.state.tasks.map((task, i) => {
          if (task.done){
            assignClass = 'task-complete task-item-default';
            button1 = <button onClick={() => this.deleteTask(task.id)} className="delete-task">Delete Task</button>;
            button2 = <button onClick={() => this.completeTask(task.id)} className="mark-incomplete-task">Mark Incomplete</button>;
          }else {
            assignClass = 'not-done task-item-default';
            button1 = <button onClick={() => this.fetchTask(task.id)}>Show This Task</button>;
            button2 = <button onClick={() => this.completeTask(task.id)} className="mark-complete-task">Mark Completed</button>;
          }
           return( <div key={i} className={assignClass}>
            <h3 >{task.title}</h3>
            <p>{task.description}</p>
            {button1}
            {button2}
            {homeButton}
            </div>
          );
        });
        return(
          <div>
            <h1>My ToDo List</h1>
            <TaskForm />
            <div className="center-flex">
              <div className="tasks-container">

                  {allTasks}

              </div>
            </div>

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
    this.validateEntry();
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

  validateEntry(){
    if (this.state.title.length < 1 || this.state.description.length < 1){
      return false;
    }
    return true;
  }

  renderErrors(errors){
    if (errors){
      return <p className="errors">*Both Fields Must Be Filled In</p>;
    }else {
      return <p></p>;
    }
  }

  render(){
    return(
      <div>
        <h2>Create a ToDo:</h2>
        <form>
          <label>Title</label><br />
          <input name="title" onChange={this.handleChange}/><br />
          <label>Description</label><br />
          <textarea name="description" onChange={this.handleChange}></textarea><br />
          <button onClick={this.submitState}>Submit ToDo</button><br />
        </form>
      </div>
    );
  }
}
//end Create Task Form

export default AllTasks;
