import React from 'react';
import style from'../ProfileInfo.module.css';

const ProfileStatus = (props) => {
    return (
      <div className={style.personalInfo}>
        <span className={style.subtitle}>Status:</span>
        <div className={style.statusPanel}>
        <p className={style.status}>{!props.status ? 'Hello!' : props.status}</p>
        </div>
      </div>
    )
};

export default ProfileStatus;