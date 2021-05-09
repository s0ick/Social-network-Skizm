import React, { useRef, useEffect } from 'react';

const Timer = (props) => {

  const counter = useRef();

  let interval;

  const countTimer = (lockUpDate) => {
    const getTimeRemaining = () => {
      let dateStop = new Date(lockUpDate).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow ) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours  = Math.floor(timeRemaining / 60 / 60);
      return { timeRemaining, hours, minutes, seconds };
    };

    const fixInteger = (int) => {
      if(int < 10) int = `0${int}`;
      return int;
    };
  
    interval = setInterval(() => {
      let timer = getTimeRemaining();
      if (timer.timeRemaining > 0) {
        if(counter.current) counter.current.textContent = `${fixInteger(timer.hours)}:${fixInteger(timer.minutes)}:${fixInteger(timer.seconds)}`;
      } else {
        props.activate(false);

        const { username, valueOnline, valueOffline } = props.props;
        let lockUpDate = new Date().getTime() + new Date((valueOnline + valueOffline) * 60000).getTime();
        let restOnline = valueOnline * 60000;

        props.updatePomodoro(username, valueOnline, valueOffline, false, new Date(lockUpDate));
        props.updateRestTime(username, restOnline);
        clearInterval(interval);
      }
    }, 1000);
  };

  useEffect(() => {
    countTimer(props.props.lockUpDate);

    return function() {
      clearInterval(interval);
    };
  }, [props.props.lockUpDate, interval]);
  
  

  return (
    <div>
      <h1 ref={counter}>00:00:00</h1>
    </div>
  )
};

export default Timer;