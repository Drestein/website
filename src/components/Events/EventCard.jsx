import styled from "styled-components";
import "./styles/test.css";
import { useContext } from "react";
import DisplayPopupContext from "../../context/DisplayPopupContext";
const EventCard = ({
  name,
  desc,
  color,
  tag,
  date,
  setOpenModal,
  rules,
  type,
  venue,
  time,
  members,
  round1,
  round1title,
  round2title,
  round3title,
  round4title,
  round2,
  round3,
  round4,
  tagline,
  prize,
  staff,
  student,
  logo,
  round1level2,
  format,
  round2level2,
  day1,
  list,
  day2,
  day3,
  company,
  link,
  note,
  morng,
  afternoon,
  compet,
  material,
}) => {
  const { setEventObject } = useContext(DisplayPopupContext);

  const handleEventInfo = () => {
    setOpenModal((prev) => !prev);

    setEventObject({
      name,
      date,
      desc,
      format,
      rules,
      type,
      venue,
      time,
      members,
      round1,
      round1title,
      round2title,
      round3title,
      round4title,
      tagline,
      round2,
      round3,
      round4,
      prize,
      staff,
      student,
      logo,
      list,
      tag,
      round1level2,
      round2level2,
      day1,
      day2,
      day3,
      company,
      link,
      note,
      morng,
      afternoon,
      compet,
      material,
    });
  };

  const Card = styled.div`
    font-family: "poppins", sans-serif;
    --color: ${color};
    --bg-filter-opacity: 0.75;
    --bg-img: url("/EventsAssets/bg.webp");
    background-image: linear-gradient(
        rgba(var(--color), var(--bg-filter-opacity)),
        rgba(0, 0, 0, var(--bg-filter-opacity))
      ),
      var(--bg-img);
    border: 1px solid;
    height: 15em;
    width: 12em;
    font-size: 1.5em;
    color: white;
    border-radius: 1em;
    padding: 1em;
    display: flex;
    align-items: flex-end;
    background-size: cover;
    background-position: center;
    box-shadow: 0 0 2em -1em black;
    transition: all, 0.5s;
    position: relative;
    overflow: hidden;
    text-decoration: none;
  `;

  return (
    <div className="event-card">
      <Card className="eventcard" onClick={handleEventInfo}>
        <div>
          <img
            src={`${logo}`}
            style={{
              // background:'white',
              color: "black",
              borderRadius: "30px",
              maxHeight: "111px",
              width: "111px",
              objectFit: "contain",
              boxShadow:
                "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
            }}
            alt="logo"
          />

          <h1
            style={{
              marginBottom: "0.7rem",
            }}
          >
            {name}
          </h1>
          {/* <p>{tagline}</p> */}
          <div className="date">{date}</div>
          <div className="tags">
            <div className="tag">{tag}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EventCard;
