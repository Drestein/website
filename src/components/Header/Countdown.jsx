import React, { useEffect, useState } from "react";
import "./styles/countdown.scss";

const CountDown = () => {
  const end = new Date();
  end.setFullYear(2023);
  end.setMonth(11);
  end.setDate(2);
  end.setHours(2);
  end.setMinutes(60);

  const [daysDiff, setdaysDiff] = useState(0);
  const [hoursDiff, sethoursDiff] = useState(0);
  const [minutesDiff, setminutesDiff] = useState(0);
  const [secondsDiff, setsecondsDiff] = useState(0);

  useEffect(() => {
    if (end.getTime() - new Date().getTime() > 0) {
      const timer = setInterval(() => {
        const msDiff = end.getTime() - new Date().getTime();
        const daysDiff = Math.trunc(msDiff / (1000 * 3600 * 24));
        setdaysDiff(daysDiff);
        sethoursDiff(23 - new Date().getHours());
        setminutesDiff(59 - new Date().getMinutes());
        setsecondsDiff(59 - new Date().getSeconds());
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  });
  const DeviceSize = window.innerWidth;

  return (
    <div className="countdown-container">
      <div className="days">
        Days <div id="countdown-card">{daysDiff}</div>
      </div>
      <div className="hours">
        Hours <div id="countdown-card">{hoursDiff}</div>
      </div>
      {DeviceSize < 600 ? (
        <>
          <div className="mins">
            Mins <div id="countdown-card">{minutesDiff}</div>
          </div>
          <div className="secs">
            Secs <div id="countdown-card">{secondsDiff}</div>
          </div>
        </>
      ) : (
        <>
          <div className="mins">
            Minutes <div id="countdown-card">{minutesDiff}</div>
          </div>
          <div className="secs">
            Seconds <div id="countdown-card">{secondsDiff}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default CountDown;
