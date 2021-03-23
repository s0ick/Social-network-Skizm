import React from 'react';
import style from './User.module.css';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../../assets/images/user_null.png';

const User = React.memo((props) => {
  return (
    <div className={style.user}>
      <div className={style.block}>
        <div className={style.leftColumn}>
          <div className={style.avatar}>
            <img className={style.img} src={props.photo_url !== null ? props.photo_url : userPhoto}/>
          </div>
          <div>
            <button disabled={props.loading.some(id => id === props.id)} id={props.id} onClick={(event) => {props.onFollowChanged(event.target.id, props.followed)}} className={style.button}>{props.followed ? 'Unfollow' : 'Follow'}</button>
          </div>
        </div>
        <div className={style.rightColumn}>
          <div className={style.name}>{props.fullName}</div>
          <div className={style.location}>{props.country}, {props.city}</div>
          <div className={style.status}>{props.status}</div>
        </div>
      </div>
    {/* <div className={style.background}>
      <img className={style.backgroundImage} src={props.background} alt="background"/>
    </div> */}
    <NavLink to={`/profile/${props.id}`} className={style.profileButton}>
      <span className={style.ellipse}>
        <span className={style.arrow}></span>
      </span>
      <span className={style.linkName}>Profile</span>
    </NavLink>
    </div>
  );
});

export default User;
