import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

function About() {
  const AboutHead = styled.div`
    height: auto;
    width: 100vw;
    background: linear-gradient(
      45deg,
      rgb(0 40 86 / 75%) 51.2%,
      rgb(0 125 66 / 75%) 98.6%
    );
    margin-top: 100px;
    display: flex;
    --bg-img: url("https://www.saveetha.ac.in/images/sec/2020/home/building_2.jpg");
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.35)),
      var(--bg-img);
    background-position: center;

    background-repeat: no-repeat;
    background-size: cover;

    justify-content: center;
    overflow-x: hidden;
    border-radius: 20px 20px 0 0;
    overflow-y: hidden;
  `;

  const AboutContainer = styled.div`
    padding: 100px 100px;
    @media screen and (max-width: 600px) {
      padding: 20px 30px;
    }
  `;

  const AboutTitle = styled.div`
    font-size: 7vw;
    font-weight: bold;
    display: flex;
    text-transform: capitalize;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: "Montserrat", sans-serif;
  `;

  const AboutDescript = styled.div`
    font-size: 1.5em;
    padding: 20px 0px;
  `;

  const text = {
    offscreen: { y: 100, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 2,
      },
    },
  };

  const headtext = {
    offscreen: { opacity: 0 },
    onscreen: {
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 2,
      },
    },
  };

  const List = styled.li`
    font-size: 0.75em;
    padding: 10px;
  `;

  const Descard = styled.div`
    font-size: 0.75em;
    background-color: rgba(225, 225, 225, 0.75);
    color: black;
    border-radius: 1rem;
    padding: 1rem;
    margin: 1rem;
  `;

  const Descardhead = styled.span`
    font-weight: bold;
  `;

  return (
    <AboutHead
      as={motion.div}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.1 }}
      transition={{
        staggerChildren: 0.5,
      }}
    >
      <AboutContainer>
        <AboutTitle
          as={motion.div}
          initial="offscreen"
          whileInView="onscreen"
          variants={headtext}
        >
          <div
            className="GalleryHeadTxt"
            style={{
              backgroundImage:
                "linear-gradient( 45deg, rgb(249 139 255 / 75%) 0%, rgb(43 209 255 / 75%) 52%, rgb(43 255 135 / 75%) 92% )",
            }}
          >
            ABOUT SEC
          </div>
        </AboutTitle>
        <AboutDescript>
          <div style={{ display: "flex" }}>
            <Descard as={motion.div} variants={text} style={{ width: "50%" }}>
              <Descardhead>Our Vision:</Descardhead> To be and to be recognized
              for setting the standard of excellence in engineering education
              and high quality research in Science and Technology.
            </Descard>
            <Descard as={motion.div} variants={text} style={{ width: "50%" }}>
              <Descardhead>Our Mission:</Descardhead> To promote academic
              excellence; widen intellectual horizon; self-discipline and high
              ideals for the total personality development of the individual.
            </Descard>
          </div>

          {/* <List as={motion.li} variants={text}>
              Saveetha Engineering College (SEC) was established in 2001, by the
              Founder Chairman Dr. N. M. Veeraiyan, a committed and dedicated
              Medical Professional.
            </List> */}

          <Descard as={motion.li} variants={text}>
            Ranked 96 by NIRF- National Institute Ranking Framework for the
            academic year 2017-18 among all IITs, Central, State and Private
            Institutions in India.{" "}
          </Descard>
          <Descard as={motion.li} variants={text}>
            Awarded 'A' GRADE with a high score of 3.19 on a scale of 4 by the
            National Assessment and Accreditation Council (NAAC) for 5 Years.
          </Descard>

          <Descard as={motion.li} variants={text}>
            SEC awarded AUTONOMOUS status by the UGC from the academic year
            2019-2020.
          </Descard>
          <Descard as={motion.li} variants={text}>
            SEC is recognized as a Scientific and Industrial Research
            Organization (SIRO) by the Department of Scientific and Industrial
            Research (DSIR), Government of India.
          </Descard>
          <Descard
            as={motion.li}
            variants={text}
            style={{ marginBottom: "5rem" }}
          >
            Seven Research Centres recognised by Anna University
          </Descard>
        </AboutDescript>
      </AboutContainer>
    </AboutHead>
  );
}

export default About;
