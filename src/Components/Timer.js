import React, { useState, useEffect } from 'react';

const Timer = ({timer}) => {

const calculateTimeLeft = () => {
    let difference = +new Date(timer) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className=''>
       {Object.keys(timeLeft).length === 0 ?
        <div  style={{ fontSize: '30px'}}>Countdown ended!</div>
        :
        <div className='timer'>
          <div>{days} </div>:
          <div>{hours} </div>:
          <div>{minutes} </div>:
          <div>{seconds} </div>
        </div>
      }
    </div>
  );
};

export default Timer;
