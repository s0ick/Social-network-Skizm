import React from 'react';
import { CircleSlider } from "react-circle-slider";
import Timer from '../common/Timer/Timer';
import style from './Pomodoro.module.css';

const Pomodoro = React.memo((props) => {

  return (
    <div className={style.tomato}>
      <h1 className={style.title}>Техника "Помидорка"</h1>
      <p className={style.description}>Помидорка - это техника управления временем. Skizm использует её для помощи в контроле времени провождения в приложении. Она поможет вам сделать перерыв в виртуальной жизни и вернуться в реальную жизнь к своим заботам.</p>

      <div className={style.block}>
        <div className={style.column}>
          <h2 className="titleCircle">Время в онлайне</h2>

          <CircleSlider
            value={props.valueOnline} 
            onChange={props.handleChangeOnline}
            showTooltip="true"
            gradientColorFrom="#9dd3c6"
            gradientColorTo="#0091ea"
            tooltipColor="#fff"
            size={240}
            stepSize={5}
            min={20} 
            max={120}
            circleWidth={4}
            progressWidth={6}
            knobRadius={10}
            shadow="true"
          />

          <span className="min">В мин</span>

        </div>
        <div className={style.column}>
          <h2 className="titleCircle">Время блокировки</h2>

          <CircleSlider
            value={props.valueOffline} 
            onChange={props.handleChangeOffline}
            showTooltip="true"
            gradientColorFrom={"#000"}
            gradientColorTo={"#000"}
            tooltipColor="#fff"
            size={240}
            stepSize={5}
            min={5} 
            max={180}
            circleWidth={4}
            progressWidth={6}
            knobRadius={10}
            shadow="true"
          />

          <span className="min">В мин</span>

        </div>
      </div>

      <div className={style.footer}>
        <button onClick={props.saveTimer} className={style.button}>Сохранить</button>
      </div>
    </div>
  )
});

export default Pomodoro;