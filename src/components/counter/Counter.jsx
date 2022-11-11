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
  const [users, setUsers] = useState(300);
  const { RegUsers } = useContext(UserContext);
  useEffect(() => {
    setUsers(300 + RegUsers.length);
  }, [RegUsers]);

  // const docRef = collection(db, "RegisteredPeople");

  // const colref = collection(db, "RegisteredPeople");
  // // const q = query(colref, where("cashPaid", "==", false));

  // const promice = new Promise((resolve, reject) => {
  //   onSnapshot(colref, (snapshot) => {
  //     let books = [];

  //     snapshot.docs.forEach((doc) => {
  //       books.push({ ...doc.data(), id: doc.id });
  //     });
  //     // console.log(books)

  //     // setUsers(pre=>pre+books.length);
  //     resolve(books);
  //   });
  // });
  // const functionfetch = async () => {
  //   const response = await promice;

  //   console.log(response.length);
  //   setUsers(300 + response.length);
  // };

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
          <strong data-number="5+">
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
          <strong data-number="28+">
            <CountUp {...rest} start={viewPortEntered ? null : 0} end={28}>
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
            <CountUp {...rest} start={viewPortEntered ? null : 0} end={users}>
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
            Registered <br /> people{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Counter;
