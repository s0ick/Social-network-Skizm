import React from 'react';
import style from'../ProfileInfo.module.css';

const ProfileDescp = ({subtitle, info}) => {
  return (
    <div className={style.personalInfo}>
      <span className={style.subtitle}>{subtitle}</span>
      <p className={style.status}>{info}</p>
    </div>
  )
};

export default ProfileDescp;