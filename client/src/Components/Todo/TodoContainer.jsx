import React, { useState, useEffect } from 'react';
import { TodoAPI } from '../../API/api';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Todo from './Todo';
import Preloader from '../common/Preloader/Preloader';


const TodoContainer = ({login}) => {
  const [tasks, setTasks] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      if(fetching) {
        const response = await TodoAPI.getTasks(login);
        if(response.status === 200) {
          setTasks(response.data);
          setFetching(false);
        }
      }
    };
    getTasks();
  }, [fetching]);

  const createTask = async (task) => {
    const response = await TodoAPI.createTask(login, task);

    if(response.status === 201) {
      setTasks([...tasks, task]);
    }
  };

  const deleteTask = async (id) => {
    const response = await TodoAPI.deleteTask(id);

    if(response.status === 200) {
      let array = tasks.filter(t => t.id !== id);
      setTasks(array);
    }
  };

  const updateTask = async (id, task) => {
    const response = await TodoAPI.updateTask(login, id, task);

    if(response.status === 200) {
      setTasks(tasks.map(t => {
        if(t.id === id) return task;
        return t;
      }));
    }
  };

  if(fetching) {
    return (<><Preloader /></>)
  } else {
    return (
      <div>
        <Todo 
          tasks={tasks}
          createTask={createTask} 
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      </div>
    )
  }
};

let mapStateToProps = (state) => ({
  login: state.auth.login,
});

export default compose(
  connect(mapStateToProps, {}),
  withRouter
)(TodoContainer);
