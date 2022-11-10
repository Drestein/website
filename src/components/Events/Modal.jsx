import React, { useContext, useEffect } from "react";
import "./styles/modal.scss";
import DisplayPopupContext from "../../context/DisplayPopupContext";
import { VscClose } from "react-icons/vsc";
import { TiLocation } from "react-icons/ti";
import { FcAlarmClock } from "react-icons/fc";
import { IoIosPeople } from "react-icons/io";
import RegisterBtn from "../register-button/RegisterBtn";
import { HashLink as Link } from "react-router-hash-link";

const Modal = ({ open, setOpenModal }) => {
  const { eventObject } = useContext(DisplayPopupContext);
  const splitrules = eventObject?.rules?.split(".");
  const splitjudge = eventObject?.judge?.split(".");
  const splitround1 = eventObject?.round1?.split(".");
  const splitround2 = eventObject?.round2?.split(".");
  const splitround3 = eventObject?.round3?.split(".");
const splitround1level2 = eventObject?.round1level2?.split('.');
const splitround2level2 = eventObject?.round2level2?.split('.');
const splitworktopicd1  = eventObject?.day1?.topic?.split('\n');
const splitworktopicd2  = eventObject?.day2?.topic?.split('\n');

  
useEffect(()=>{
 console.log('this is',eventObject)
},[open])
  if (!open) return null;
  return (
    <div className="overlay" onClick={() => setOpenModal((prev) => !prev)}>
      <div
        className={`modal  ${open ? "slide" : ""}`}
        onClick={() => setOpenModal((prev) => !prev)}
      >
        <VscClose
          className="close-btn"
          onClick={() => setOpenModal((prev) => !prev)}
        />
        {/* if round 1 is existed then its a event. else its workshop: */}
        {eventObject.tag === "EVENT" ? (
          <>
            {eventObject.name ? (
              <h1 className="title">{eventObject.name}</h1>
            ) : (
              <h1 className="title">Title not fetched from json</h1>
            )}
            {eventObject.desc ? (
              <p className="desc">{eventObject.desc}</p>
            ) : null}
            <div className="grid">
              <div className="item">
                <span>Type</span>
                <IoIosPeople size={32} />

                <span>{eventObject.type}</span>
              </div>
              <div className="item">
                <span>Venue</span>
                <TiLocation size={32} />
                <span>{eventObject.venue}</span>
              </div>
              <div className="item">
                <span>Timings</span>
                <FcAlarmClock size={32} />
                <span>{eventObject.time}</span>
              </div>
              <div
                style={{
                  padding: 0,
                }}
                className="item"
              >
                <img
                  style={{
                    width: "100%",
                    borderRadius: "0.4rem",
                  }}
                  src={`${eventObject.logo}`}
                  // src={test}
                  alt="Logo"
                />
              </div>
            </div>
            {eventObject.format ? (
              <div className="rules">
                <h3>Format:</h3>
                <ol>
                  {splitrules.map((each) => {
                    return <li>{each}</li>;
                  })}
                </ol>
              </div>
            ) : null}
            {eventObject.rules ? (
              <div className="rules">
                <h3>Rules and Regulations:</h3>
                <ol>
                  {splitrules.map((each) => {
                    return <li>{each}</li>;
                  })}
                </ol>
              </div>
            ) : null}
            {eventObject.round1 ? (
              <div className="round1">
                <h3>
                  Round 1:
                  {eventObject.round1title
                    ? ` (${eventObject.round1title})`
                    : ""}

                </h3>
                {eventObject?.round1level2 && <h4>Level 1 :</h4> } 
                <ol>
                  {splitround1.map((each) => {
                    return <li>{each}</li>;
                  })}
                </ol>
                {eventObject?.round1level2 && 
                <>
                <h4>Level 2 :</h4>
                <ol>
                {splitround1level2.map((each) => {
                  return <li>{each}</li>;
                })}
              </ol>
              </>
                }

              </div>
            ) : null}
            {eventObject.round2 ? (
              <div className="round2">
                <h3>
                  Round 2:
                  {eventObject.round2title
                    ? `( ${eventObject.round2title} )`
                    : ""}
                </h3>
                {eventObject?.round2level2 && <h4>Level 1 :</h4> } 
                <ol>
                  {splitround2.map((each) => {
                    return <li>{each}</li>;
                  })}
                </ol>
                {eventObject?.round2level2 && 
                <>
                <h4>Level 2 :</h4>
                <ol>
                {splitround2level2.map((each) => {
                  return <li>{each}</li>;
                })}
              </ol>
              </>
                }
              </div>
            ) : null}
            {eventObject.round3 ? (
              <div className="round3">
                <h3>
                  Round 3:
                  {eventObject.round3title
                    ? `( ${eventObject.round3title} )`
                    : ""}
                </h3>
                <ol>
                  {splitround3.map((each) => {
                    return <li>{each}</li>;
                  })}
                </ol>
              </div>
            ) : null}
            {eventObject.round4 ? (
              <div className="round4">
                <h3>
                  Round 4:
                  {eventObject.round4title
                    ? `( ${eventObject.round4title} )`
                    : ""}
                </h3>
                <ol>
                  {splitround3.map((each) => {
                    return <li>{each}</li>;
                  })}
                </ol>
              </div>
            ) : null}
            {eventObject.judge ? (
              <div className="judging">
                <h3>Judging Criteria:</h3>
                <ol>
                  {splitjudge.map((each) => {
                    return <li>{each}</li>;
                  })}
                </ol>
              </div>
            ) : null}
            {eventObject.staff ? (
              <div className="faculty">
                <h3>Faculty Co-ordinators:</h3>
                <ol>
                  {eventObject.staff?.map((each) => {
                    return (
                      <li>
                        <span>{each.name}</span> {`(${each.phone})`}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : (
              "no staff allocated"
            )}
            {eventObject.student ? (
              <div className="student">
                <h3>Student Co-ordinators:</h3>
                <ol>
                  {eventObject.student?.map((each) => {
                    return (
                      <li>
                        <span>{each.name}</span> {`(${each.phone})`}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : (
              "no student allocated"
            )}
          </>
        ) : (
          <>
            {eventObject.name ? (
              <h1 className="title">{eventObject.name}</h1>
            ) : (
              <h1 className="title">Title not fetched from json</h1>
            )}

            {eventObject?.day1 ? (
              <>
                {eventObject.company ? (
                  <h4>Company Name : {eventObject.company}</h4>
                ) : null}
                <h1 className="title">Day 1:</h1>
                                <p className="desc">Date: {eventObject.day1.date}</p>

                {eventObject.day1.topic &&
                <div>

                  {eventObject.day1.list ? 
                <>
                {splitworktopicd1.map(data=>{
                  return <p style={{
                    margin:'5px 0'
                  }}>{data}</p>
                })}
                </>

              :  <p className="desc">

              <span className="topic">Topic: </span>
              {eventObject.day1.topic}
              </p> 

}

                </div>
                
                }

                <div className="grid">
                  <div className="item">
                    <span>Mode</span>
                    <IoIosPeople size={32} />
                    <span>{eventObject.day1?.mode}</span>
                  </div>
                  <div className="item">
                    <span>Venue</span>
                    <TiLocation size={32} />
                    <span>{eventObject.day1?.venue}</span>
                  </div>
                  <div className="item">
                    <span>Timings</span>
                    <FcAlarmClock size={32} />
                    <span>{eventObject.day1?.time}</span>
                  </div>
                  <div
                    style={{
                      padding: 0,
                    }}
                    className="item"
                  >
                    <img
                      style={{
                        width: "100%",
                        borderRadius: "0.4rem",
                      }}
                      src={`${eventObject.logo}`}
                      alt="Logo"
                    />
                  </div>
                </div>
              </>
            ) : null}
            {eventObject?.day1?.resource ? (
              <div className="faculty">
                <h3>Resource Person:</h3>
                <ol>
                  {eventObject?.day1.resource?.map((each) => {
                    return (
                      <li>
                        <span>{each.name}</span> {`(${each.phone})`} <br />{" "}
                        {`${each.desig}`}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : (
              "no resource allocated"
            )}
            {eventObject?.day1?.staff ? (
              <div className="faculty">
                <h3>Faculty Co-ordinators:</h3>
                <ol>
                  {eventObject?.day1?.staff?.map((each) => {
                    return (
                      <li>
                        <span>{each.name}</span> {`(${each.phone})`}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : (
              "no staff allocated"
            )}
            {eventObject?.day1?.student ? (
              <div className="student">
                <h3>Student Co-ordinators:</h3>
                <ol>
                  {eventObject.day1.student?.map((each) => {
                    return (
                      <li>
                        <span>{each.name}</span> {`(${each.phone})`}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : (
              "no student allocated"
            )}
            
            {eventObject?.day2 ? (
              <>
                {eventObject.company ? (
                  <h4>Company Name : {eventObject.company}</h4>
                ) : null}
                <h1 className="title">Day 2:</h1>
                                <p className="desc">Date: {eventObject.day2.date}</p>

                {eventObject.day2.topic &&
                <div>

                  {eventObject.day2.list ? 
                <>
                {splitworktopicd2.map(data=>{
                  return <p style={{
                    margin:'5px 0'
                  }}>{data}</p>
                })}
                </>

              :  <p className="desc">

              <span className="topic">Topic: </span>
              {eventObject.day2.topic}
              </p> 

}

                </div>
                
                }

                <div className="grid">
                  <div className="item">
                    <span>Mode</span>
                    <IoIosPeople size={32} />
                    <span>{eventObject.day2?.mode}</span>
                  </div>
                  <div className="item">
                    <span>Venue</span>
                    <TiLocation size={32} />
                    <span>{eventObject.day2?.venue}</span>
                  </div>
                  <div className="item">
                    <span>Timings</span>
                    <FcAlarmClock size={32} />
                    <span>{eventObject.day2?.time}</span>
                  </div>
                  <div
                    style={{
                      padding: 0,
                    }}
                    className="item"
                  >
                    <img
                      style={{
                        width: "100%",
                        borderRadius: "0.4rem",
                      }}
                      src={`${eventObject.logo}`}
                      alt="Logo"
                    />
                  </div>
                </div>
              </>
            ) : null}
            {eventObject?.day2?.resource ? (
              <div className="faculty">
                <h3>Resource Person:</h3>
                <ol>
                  {eventObject?.day2.resource?.map((each) => {
                    return (
                      <li>
                        <span>{each.name}</span> {`(${each.phone})`} <br />{" "}
                        {`${each.desig}`}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : (
              "no resource allocated"
            )}
            {eventObject?.day2?.staff ? (
              <div className="faculty">
                <h3>Faculty Co-ordinators:</h3>
                <ol>
                  {eventObject?.day2?.staff?.map((each) => {
                    return (
                      <li>
                        <span>{each.name}</span> {`(${each.phone})`}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : (
              "no staff allocated"
            )}
            {eventObject?.day2?.student ? (
              <div className="student">
                <h3>Student Co-ordinators:</h3>
                <ol>
                  {eventObject.day2.student?.map((each) => {
                    return (
                      <li>
                        <span>{each.name}</span> {`(${each.phone})`}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : (
              "no student allocated"
            )}
          </>
        )}
        <Link style={{ textDecoration: "none" }} to="/form">
          <div onClick={() => setOpenModal((prev) => !prev)} className="btn">
            <RegisterBtn />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Modal;
