import React from "react";
import styled from "styled-components";
import DepartMentCard from "./DepartMentCard";
import { departobj, comobj } from "../../configs/Departments.config";
import { motion } from "framer-motion";
import SpacialEventsCard from "./SpecialEventsCard";

const DepartmentContainer = styled.div`
  width: 100vw;
  display: grid;
  margin-top: 50px;
  place-items: center;
  min-height: 100px;
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1250px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

function Departments() {
  return (
    <>
      <motion.h1
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 1 }}
        className="DeptHead"
      >
        <div className="GalleryHeadTxt">Department Events</div>
      </motion.h1>
      <DepartmentContainer>
        {departobj.map((data, i) => {
          return <DepartMentCard key={i} {...data} />;
        })}
      </DepartmentContainer>

      <motion.h1
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 1 }}
        className="DeptHead"
      >
        <div className="GalleryHeadTxt" id="SpecialEvents">
          Special Events
        </div>
      </motion.h1>
      <DepartmentContainer>
        {comobj.map((data, i) => {
          if (data.title === "Paper Presentation") {
            return (
              <a href="PaperPresentation.pdf" key={i} target="_blank">
                <SpacialEventsCard {...data} />
              </a>
            );
          }

          return <SpacialEventsCard key={i} {...data} />;
        })}
      </DepartmentContainer>
    </>
  );
}

export default Departments;
