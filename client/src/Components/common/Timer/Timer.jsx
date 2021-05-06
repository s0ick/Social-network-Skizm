import React, { useRef, useEffect } from 'react';

const Timer = (props) => {

  const counter = useRef();

  let interval;

  const countTimer = (dateBlocked) => {
    const getTimeRemaining = () => {
      let dateStop = new Date(dateBlocked).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow ) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours  = Math.floor(timeRemaining / 60 / 60);
      return {timeRemaining, hours, minutes, seconds};
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
        let dateBlocked = new Date().getTime() + new Date((valueOnline + valueOffline) * 60000).getTime();

        props.updatePomodoro(username, valueOnline, valueOffline, false, new Date(dateBlocked));
        clearInterval(interval);
      }
    }, 1000);
  };

  useEffect(() => {
    countTimer(props.props.dateBlocked);

    return function() {
      clearInterval(interval);
    };
  }, [props.props.dateBlocked, interval]);
  
  

  return (
    <div>
      <h1 ref={counter}>00:00:00</h1>
    </div>
  )
};

export default Timer;