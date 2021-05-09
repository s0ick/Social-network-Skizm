import React from 'react';
import style from './Task.module.css';
import { DeleteIcon, DoneIcon } from '../../common/Icons/Icons';

const Task = (props) => {
  const {id, message, completed } = props;
  return (
    <div className={style.item}>
      <p className={style.message}>
        {props.message}
      </p>
      <div className={style.panel}>
        <button onClick={() => props.updateTask(id, {id, message, completed: !completed, dateCompleted: new Date() })} className={style.complete}>
          <DoneIcon fill={"#9dd3c6"} stroke={"none"} />
        </button>
        <button onClick={() => props.deleteTask(id) } className={style.remove}>
          <DeleteIcon fill={"#ff1744"} stroke={"none"} />
        </button>
      </div>
    </div>
  )
};

export default Task;