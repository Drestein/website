import React, { useEffect, useState } from "react";
import "./styles/countdown.scss";

const CountDown = () => {
  // Set the end date
  const end = new Date(2023, 10, 3, 2, 0);

  const [timeDiff, setTimeDiff] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (end.getTime() - new Date().getTime() > 0) {
      const timer = setInterval(() => {
        const msDiff = end.getTime() - new Date().getTime();
        const days = Math.trunc(msDiff / (1000 * 3600 * 24));
        const hours = Math.trunc((msDiff / (1000 * 3600)) % 24);
        const minutes = Math.trunc((msDiff / (1000 * 60)) % 60);
        const seconds = Math.trunc((msDiff / 1000) % 60);
        setTimeDiff({ days, hours, minutes, seconds });
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, []);

  const DeviceSize = window.innerWidth;
  const timeUnitLabel = DeviceSize < 600 ? ["Days", "Hrs", "Mins", "Secs"] : ["Days", "Hours", "Minutes", "Seconds"];

  return (
    <div className="countdown-container">
      {Object.keys(timeDiff).map((unit, index) => (
        <div className={unit.toLowerCase()} key={unit}>
          {timeUnitLabel[index]} <div id="countdown-card">{timeDiff[unit]}</div>
        </div>
      ))}
    </div>
  );
};

export default CountDown;
