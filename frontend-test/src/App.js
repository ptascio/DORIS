import React from 'react';
import $ from 'jquery';



class AllTasks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
        };
    }

    fetchTasks(){
      // return $.getJSON('http://flask-todo-peter-tascio-joelbcastillo.c9users.io/tasks')
      return $.getJSON('http://0.0.0.0:8080/tasks')
      .then((data) => {
        this.setState({ tasks: data.tasks });
      });
    }

    componentDidMount() {
      this.fetchTasks();
    }

    render() {
        const allTasks = this.state.tasks.map((task, i) => {
           return( <div key={i}>
            <h3 >{task.title}</h3>
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

export default AllTasks;
