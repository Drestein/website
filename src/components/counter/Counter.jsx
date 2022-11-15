import React, { useEffect, useState } from "react";
import "./counter.css";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useContext } from "react";
import { UserContext } from "../Admin/contexts/AdminContext";
import { collection, doc, getDocs } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { db } from "../../configs/Firebase.config";
const Counter = ({ ...rest }) => {
  const [viewPortEntered, setViewPortEntered] = useState(false);

  const [views, setViews] = useState(localStorage.getItem("value"));
  useEffect(() => {
    setViews(parseInt(views));
  }, []);

  return (
    <div className="counter">
      <div className="counter-row">
        <div className="counter-column">
          <strong data-number="53">
            <CountUp {...rest} start={viewPortEntered ? null : 0} end={53}>
              {({ countUpRef }) => {
                return (
                  <VisibilitySensor
                    active={!viewPortEntered}
                    onChange={(isVisible) =>
                      isVisible ? setViewPortEntered(true) : null
                    }
                    delayedCall
                  >
                    <span className="number" ref={countUpRef} />
                  </VisibilitySensor>
                );
              }}
            </CountUp>
          </strong>
          <span>
            Total <br /> Events{" "}
          </span>
        </div>
        <div className="counter-column">
          <strong data-number="5">
            <CountUp {...rest} start={viewPortEntered ? null : 0} end={5}>
              {({ countUpRef }) => {
                return (
                  <VisibilitySensor
                    active={!viewPortEntered}
                    onChange={(isVisible) =>
                      isVisible ? setViewPortEntered(true) : null
                    }
                    delayedCall
                  >
                    <span className="number" ref={countUpRef} />
                  </VisibilitySensor>
                );
              }}
            </CountUp>
          </strong>
          <span>
            Lakhs+ <br /> Prizes{" "}
          </span>
        </div>
        <div className="counter-column">
          <strong data-number="34+">
            <CountUp {...rest} start={viewPortEntered ? null : 0} end={35}>
              {({ countUpRef }) => {
                return (
                  <VisibilitySensor
                    active={!viewPortEntered}
                    onChange={(isVisible) =>
                      isVisible ? setViewPortEntered(true) : null
                    }
                    delayedCall
                  >
                    <span className="number" ref={countUpRef} />
                  </VisibilitySensor>
                );
              }}
            </CountUp>
          </strong>
          <span>
            On Going <br /> Workshops{" "}
          </span>
        </div>
        <div className="counter-column">
          <strong data-number="305">
            <CountUp {...rest} start={viewPortEntered ? null : 0} end={1700+views}>
              {({ countUpRef }) => {
                return (
                  <VisibilitySensor
                    active={!viewPortEntered}
                    onChange={(isVisible) =>
                      isVisible ? setViewPortEntered(true) : null
                    }
                    delayedCall
                  >
                    <span className="number" ref={countUpRef} />
                  </VisibilitySensor>
                );
              }}
            </CountUp>
          </strong>
          <span className="words">
            Site views
          </span>
        </div>
      </div>
    </div>
  );
};

export default Counter;
