import React from 'react';
import style from '../News.module.css';
import userDef from '../../../assets/images/user_null.png';
import backgroundDef from '../../../assets/images/bg_null-2.jpg';
import sub from '../../../assets/images/subscribe.svg';
import { NavLink } from 'react-router-dom';

const Author = (props) => {

  let ava = '';
  if(!!props.avatarURL) ava = props.avatarURL;
  else ava = userDef;

  let background = '';
  if(!!props.backgroundURL) background = props.backgroundURL;
  else background = backgroundDef;

  return (
    <div className={style.item}>

      <div className={style.user}>
        <div className={style.ava}>
          <img className={style.img} src={ava} alt="avatar"/>
        </div>
        
        <p className={style.username}>{props.author}</p>
      </div>


      <NavLink to={`/profile/${props.author}`} className={style.button}>
        <img src={sub} alt="subscribe"/>
      </NavLink>

      <div className={style.background}>
        <img className={style.backgroundImage} src={background} alt="background"/>
      </div> 
    </div>
  )
};

export default Author;