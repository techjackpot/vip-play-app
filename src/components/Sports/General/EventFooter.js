import React, { useEffect, useState } from 'react';
import moment from 'moment';

const liveIcon = 'https://res.cloudinary.com/production/image/upload/v1723538992/Icons/VIP/live.svg';
const liveScoreIcon = 'https://res.cloudinary.com/production/image/upload/v1725155718/Icons/VIP/Live_Score.svg';
const clockIcon = 'https://res.cloudinary.com/production/image/upload/v1723625829/Icons/VIP/clock.svg';

function ShowRemainingTime({start}) {
  const [remaining, setRemaining] = useState(0);
  const checkTime = () => {
    setRemaining(Math.floor(moment(start).diff(moment()) / 1000));
  };
  useEffect(() => {
    checkTime();
    const intervalId = setInterval(checkTime, 1000);
    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return (
    <>
      <img src={clockIcon} className="icon-clock" alt="" />
      <span>Starting soon</span>
      <div className="remaining">
        <span className="minutes">{('' + Math.floor(remaining / 60)).padStart(2, '0')}</span>
        :
        <span className="seconds">{('' + (remaining % 60)).padStart(2, '0')}</span>
      </div>
    </>
  )
}

export default function EventFooter({state, start}) {
  const [isSoon, setIsSoon] = useState(false);

  const checkTime = () => {
    if (moment(start).diff(moment()) < 1000 * 60 * 30) {
      !isSoon && setIsSoon(true);
    }
  };

  useEffect(() => {
    checkTime();
    const intervalId = setInterval(checkTime, 1000);
    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return (
    <div className="event-footer">
      <div className="event-status-wrapper">
        <span className="event-status-label">SPR</span>
        <div className="event-status">
          {state === 'STARTED' && <img src={liveIcon} className="icon-live" alt="" />}
          {state === 'STARTED' && <img src={liveScoreIcon} className="icon-live-score" alt="" />}
          {state === 'NOT_STARTED' && (isSoon ? (
            <ShowRemainingTime start={start} />
          ) : (
            <span>{moment(start).calendar()}</span>
          ))}
        </div>
      </div>
      <a href="/" className="color-orange">More Wagers &gt;</a>
    </div>
  )
}
