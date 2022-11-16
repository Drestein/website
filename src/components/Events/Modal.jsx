import React, { useContext } from "react";
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
  const splitround1 = eventObject?.round1?.split(".");
  const splitround2 = eventObject?.round2?.split(".");
  const splitround3 = eventObject?.round3?.split(".");
  const splitround4 = eventObject?.round4?.split(".");
  const splitnote = eventObject?.note?.split(".");
  const splitmaterial = eventObject?.material?.split(".");
  const splitcompet = eventObject?.compet?.split(".");
  const splitmorng = eventObject?.morng?.split(".");
  const splitprize = eventObject?.prize?.split(".");
  const splitafternoon = eventObject?.afternoon?.split(".");
  const splitround1level2 = eventObject?.round1level2?.split(".");
  const splitround2level2 = eventObject?.round2level2?.split(".");
  const splitworktopicd1 = eventObject?.day1?.topic?.split("\n");
  const splitworktopicd2 = eventObject?.day2?.topic?.split("\n");
  const splitworktopicd3 = eventObject?.day3?.topic?.split("\n");



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
            {eventObject.material? (
              <div className="rules">
                <h3>Materials:</h3>
                <ol>
                  {splitmaterial.map((each) => {
                    return <li>{each}</li>;
                  })}
                </ol>
              </div>
            ) : null}
            {eventObject.compet ? (
              <div className="rules">
                <h3>Competition Rules:</h3>
                <ol>
                  {splitcompet.map((each) => {
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
                {eventObject?.round1level2 && <h4>Level 1 :</h4>}
                <ol>
                  {splitround1.map((each) => {
                    return <li>{each}</li>;
                  })}
                </ol>
                {eventObject?.round1level2 && (
                  <>
                    <h4>Level 2 :</h4>
                    <ol>
                      {splitround1level2.map((each) => {
                        return <li>{each}</li>;
                      })}
                    </ol>
                  </>
                )}
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
                {eventObject?.round2level2 && <h4>Level 1 :</h4>}
                <ol>
                  {splitround2.map((each) => {
                    return <li>{each}</li>;
                  })}
                </ol>
                {eventObject?.round2level2 && (
                  <>
                    <h4>Level 2 :</h4>
                    <ol>
                      {splitround2level2.map((each) => {
                        return <li>{each}</li>;
                      })}
                    </ol>
                  </>
                )}
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
                  {splitround4.map((each) => {
                    return <li>{each}</li>;
                  })}
                </ol>
              </div>
            ) : null}
            {eventObject.note ? (
                  <div className="rules">
                    {eventObject.tag === "OFFER" ? <h3>OFFER:</h3> : <h3>NOTE:</h3>}
                    <ol>
                      {splitnote.map((each) => {
                        return <li>{each}</li>;
                      })}
                    </ol>
                  </div>
                ) : null}
                {eventObject.prize ? (
              <div className="rules">
                <h3>Scroing and Awards:</h3>
                <ol>
                  {splitprize.map((each) => {
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
            ) : null}
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
            ) : null}
            <Link style={{ textDecoration: "none" }} to="/form">
              <div
                onClick={() => setOpenModal((prev) => !prev)}
                className="btn"
              >
                <RegisterBtn />
              </div>
            </Link>
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
                {eventObject.note ? (
                  <div className="rules">
                    {eventObject.tag === "OFFER" ? <h3>OFFER:</h3> : <h3>NOTE:</h3>}
                    <ol>
                      {splitnote.map((each) => {
                        return <li>{each}</li>;
                      })}
                    </ol>
                  </div>
                ) : null}
                <h1 className="title">Day 1:</h1>
                <p className="desc">Date: {eventObject.day1.date}</p>
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

                {eventObject.day1.topic && (
                  <div>
                    {eventObject.day1.list ? (
                      <>
                        {splitworktopicd1.map((data) => {
                          return (
                            <li
                              style={{
                                margin: "5px 0",
                              }}
                            >
                              {data}
                            </li>
                          );
                        })}
                      </>
                    ) : (
                      <p className="desc">
                        <span className="topic">Topic: </span>
                        {eventObject.day1.topic}
                      </p>
                    )}
                  </div>
                )}
              </>
            ) : null}
            {eventObject.morng ? (
              <div className="rules">
                <h3>MORNING SESSION</h3>
                <ol>
                  {splitmorng.map((each) => {
                    return <li>{each}</li>;
                  })}
                </ol>
              </div>
            ) : null}
            {eventObject.afternoon ? (
              <div className="rules">
                <h3>AFTERNOON SESSION</h3>
                <ol>
                  {splitafternoon.map((each) => {
                    return <li>{each}</li>;
                  })}
                </ol>
              </div>
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
            ) : null}
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
            ) : null}
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
            ) : null}

            {eventObject?.day2 ? (
              <>
                <h1 className="title">Day 2:</h1>
                {eventObject.company ? (
                  <h4>Company Name : {eventObject.company}</h4>
                ) : null}
                <p className="desc">Date: {eventObject.day2.date}</p>
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
                {eventObject.day2.topic && (
                  <div>
                    {eventObject.day2.list ? (
                      <>
                        {splitworktopicd2.map((data) => {
                          return (
                            <li
                              style={{
                                margin: "5px 0",
                              }}
                            >
                              {data}
                            </li>
                          );
                        })}
                      </>
                    ) : (
                      <p className="desc">
                        <span className="topic">Topic: </span>
                        {eventObject.day2.topic}
                      </p>
                    )}
                  </div>
                )}
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
            ) : null}
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
            ) : null}
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
            ) : null}

            {eventObject?.day3 ? (
              <>
                <h1 className="title">Day 3:</h1>
                {eventObject.company ? (
                  <h4>Company Name : {eventObject.company}</h4>
                ) : null}
                <p className="desc">Date: {eventObject.day3.date}</p>
                <div className="grid">
                  <div className="item">
                    <span>Mode</span>
                    <IoIosPeople size={32} />
                    <span>{eventObject.day3?.mode}</span>
                  </div>
                  <div className="item">
                    <span>Venue</span>
                    <TiLocation size={32} />
                    <span>{eventObject.day3?.venue}</span>
                  </div>
                  <div className="item">
                    <span>Timings</span>
                    <FcAlarmClock size={32} />
                    <span>{eventObject.day3?.time}</span>
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
                {eventObject.day3.topic && (
                  <div>
                    {eventObject.day3.list ? (
                      <>
                        {splitworktopicd3.map((data) => {
                          return (
                            <li
                              style={{
                                margin: "5px 0",
                              }}
                            >
                              {data}
                            </li>
                          );
                        })}
                      </>
                    ) : (
                      <p className="desc">
                        <span className="topic">Topic: </span>
                        {eventObject.day3.topic}
                      </p>
                    )}
                  </div>
                )}
              </>
            ) : null}
            {eventObject?.day3?.resource ? (
              <div className="faculty">
                <h3>Resource Person:</h3>
                <ol>
                  {eventObject?.day3.resource?.map((each) => {
                    return (
                      <li>
                        <span>{each.name}</span> {`(${each.phone})`} <br />{" "}
                        {`${each.desig}`}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : null}
            {eventObject?.day3?.staff ? (
              <div className="faculty">
                <h3>Faculty Co-ordinators:</h3>
                <ol>
                  {eventObject?.day3?.staff?.map((each) => {
                    return (
                      <li>
                        <span>{each.name}</span> {`(${each.phone})`}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : null}
            {eventObject?.day3?.student ? (
              <div className="student">
                <h3>Student Co-ordinators:</h3>
                <ol>
                  {eventObject.day3.student?.map((each) => {
                    return (
                      <li>
                        <span>{each.name}</span> {`(${each.phone})`}
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : null}
            <a
              onClick={() => setOpenModal((prev) => !prev)}
              href={eventObject.link}
              className="btn"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <RegisterBtn />
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
