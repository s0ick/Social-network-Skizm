import React from 'react';
import style from './Preloader.module.css';

const Preloader = () => {
  return (
    <div className={style.ldsRing}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
};
export default Preloader;