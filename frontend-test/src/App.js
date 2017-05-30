import React from 'react';
import $ from 'jquery';


class AllTasks extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
        }
    }
    
    fetchTasks(){
        return $.getJSON('http://flask-todo-peter-tascio-joelbcastillo.c9users.io/tasks')
      .then((data) => {
        this.setState({ tasks: data.results });
      });
    }
    
    componentDidMount() {
    this.fetchTasks();
  }
    
    render() {
        debugger
        const allTasks = this.state.tasks.map((task, i) => {
           return <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
        </div>  
        });
    }

}