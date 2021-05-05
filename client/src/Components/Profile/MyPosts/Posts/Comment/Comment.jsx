import React from 'react';
import style from'./Comment.module.css';
import userImg from '../../../../../assets/images/user_null.png';

const Comment = (props) => {
  return (
    <div className={style.comment}>

      <div className={style.leftColumn}>
        <img src={props.avatar ? props.avatar : userImg} alt="avatar" className={style.logo}/>
      </div>
      <div className={style.rightColumn}>
        <div className={style.info}>
          <h2 className={style.author}>{props.username}</h2>
          <span className={style.date}>{props.date}</span>
        </div>

        <div className={style.block}>
          <p className={style.text}>{props.message}</p>
        </div>
      </div>

    </div>
  )
}
export default Comment;