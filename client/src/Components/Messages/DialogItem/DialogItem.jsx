import React from 'react';
import style from '../Messages.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = ({id, name}) => {
  return (
    <div className={style.item}>
        <NavLink activeClassName={style.activeDialog} className={style.dialogItem} to={`/messages/${id}`}>
          <div className={style.ava}>
            <img className={style.img} src="https://sun9-20.userapi.com/c830109/v830109019/1b3bf2/Rr6isaQE7tQ.jpg" alt="img"/>
          </div>
          <span>
          {name}
          </span>
        </NavLink>
    </div>
  );
}

export default DialogItem;