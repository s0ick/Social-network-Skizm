import React from 'react';
import style from './Blocked.module.css';
import Timer from '../common/Timer/Timer';

const Blocked = React.memo((props) => {
  let message = 'Время для продуктивности :)';
  return (
    <div className={style.blocked}>
      <h1 className={style.title}>{message}</h1>
      <div className={style.timer}>
        <h1 className={style.text}>До конца блокировки:</h1>
        <Timer updateRestTime={props.updateRestTime} updatePomodoro={props.updatePomodoro} activate={props.activate} props={props.props} />
      </div>

      <div className={style.animate}>
        <div className={style.container}>
          <div className={style.box}>
            <div className={style.cube}></div>
          </div>
        </div>
      </div>
    </div>
  )
});

export default Blocked;