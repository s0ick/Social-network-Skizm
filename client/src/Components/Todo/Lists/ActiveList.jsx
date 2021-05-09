import React from 'react';
import style from './style.module.css';
import Task from '../Task/Task';
import AddForm from '../Form/AddForm';

const ActiveList = (props) => {

  const onSubmit = (message) => {
    let task = {
      id: props.tasks.length ?
          props.tasks[props.tasks.length - 1].id + 1 : 0,
      message,
      completed: false,
      dateCompleted: null
    };
    props.createTask(task);
  };
  let tasks = [];
   props.tasks.map(t => {
    if(!t.completed) {
      tasks.push(<Task 
        key={`task_id_${t.id}`} 
        message={t.message} 
        id={t.id}
        completed={t.completed}
        deleteTask={props.deleteTask}
        updateTask={props.updateTask}
      />)
    }
  });

  return (
    <div className={style.container}>
      <AddForm addTask={onSubmit}/>
      <div className={style.list}>
        {
          tasks.length ? 
            tasks.map(t => t) :
            <h2 className={style.subtitle}>Список задач пустой</h2>
        }
      </div>
    </div>
  )
};

export default ActiveList;