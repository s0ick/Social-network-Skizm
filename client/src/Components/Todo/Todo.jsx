import React, { Suspense } from 'react';
import { Route, Redirect, NavLink } from 'react-router-dom';
import Preloader from '../common/Preloader/Preloader';
import ActiveList from './Lists/ActiveList';
import CompleteList from './Lists/CompleteList';
import style from './style.module.css';

const Todo = (props) => {
  return (
    <div>
      <nav className={style.navbar}>
        <NavLink to='/todo/tasks' className={style.link} activeClassName={style.active} >
          Задачи
        </NavLink>
        <NavLink to='/todo/completed' className={style.link} activeClassName={style.active} >
          Выполненные
        </NavLink>
      </nav>
      <Suspense fallback={<Preloader/>}>
        <Route path='/todo/tasks' render={() => <ActiveList 
          tasks={props.tasks}
          createTask={props.createTask}
          deleteTask={props.deleteTask}
          updateTask={props.updateTask}
        />} />
        <Route path='/todo/completed' render={() => <CompleteList 
          tasks={props.tasks}
          deleteTask={props.deleteTask}
          updateTask={props.updateTask}
        />} />
      </Suspense>
      <Redirect to='/todo/tasks' />
    </div>
  )
};

export default Todo; 