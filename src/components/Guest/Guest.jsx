import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const GuestHead = styled.div`
  padding-bottom: 3vw;
  position: relative;
  /* background: linear-gradient(90deg, #00126a -80.91%, #0b001d 111.58%); */
  background: linear-gradient(
    141deg,
    rgb(0 40 86 / 75%) 51.2%,
    rgb(0 125 66 / 75%) 98.6%
  );
  border-radius: 0 0 20px 20px;
  width: 100%;
  height: 70%;
  /* overflow-x: hidden; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const GuestTitle = styled.div`
  margin-top: 12rem;
  font-size: 8vw;
  font-weight: bold;
  display: flex;
  text-transform: capitalize;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: "Montserrat", sans-serif;

  /* font-family: poppins, sans-serif; */
  @media (max-width: 600px) {
    margin-top: 7rem;
    font-size: 10vw;
  }
`;
const GuestImageDiv = styled.div`
  width: 100vw;

  text-align: center;
`;
const GuestImg = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;
const GuestName = styled.h1``;
const GuestDesp = styled.p``;
const GuestContainer = styled.div`
  margin-top: 3rem;
  width: 100vw;

  display: flex;

  gap: 2rem;

  flex-direction: column;

  @media (min-width: 980px) {
    /* grid-template-columns: repeat(2, 1fr);
     */
    flex-direction: row;
  }
`;

const Test = styled.div`
  padding: 3.5rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(11.5px);
  -webkit-backdrop-filter: blur(11.5px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 4vw;
  text-align: center;

  width: 80%;
  font-family: "Montserrat", sans-serif;

  /* font-family: poppins, sans-serif; */
  font-weight: bold;

  height: 235px;
  border-radius: 30px;
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px 20px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px 20px inset; */
  @media (max-width: 600px) {
    height: 100px;
  }
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px; */
`;

function Guest() {
  const Guests = [
    {
      name: "Ganesh Thirunavukkarasu M ",
      desc: "",
      src: "PeopleAssets/guest.webp",
    },
  ];

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
  const textlight = {
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
  return (
    <GuestHead>
      <Test style={{ display: "flex", flexDirection: "row" }}>
        <div>Prizes worth upto 5+ Lakhs</div>
      </Test>
      <GuestTitle
        as={motion.div}
        initial="offscreen"
        whileInView="onscreen"
        variants={textlight}
      >
        <div className="GalleryHeadTxt">Chief Guest</div>
      </GuestTitle>

      <GuestContainer>
        {Guests.map((data) => {
          return (
            <GuestImageDiv
              as={motion.div}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: false, amount: 0.5 }}
              transition={{
                staggerChildren: 0.5,
              }}
              key={data.name}
            >
              <GuestImg as={motion.img} variants={text} src={data.src} />
              <GuestName
                as={motion.h1}
                initial="offscreen"
                whileInView="onscreen"
                varients={text}
                style={{
                  padding: "5px",
                }}
              >
                {data.name}
              </GuestName>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  margin: "1rem",
                }}
              >
                <img
                  src="OtherAssets/tcs.webp"
                  style={{ borderRadius: "1rem" }}
                  alt="tcs_logo"
                />

                <div style={{ textAlign: "left", maxWidth: "450px" }}>
                  Regional Head - Academic Interface Programme at Tata
                  Consultancy Services | Career Coach
                  <br />
                  Chennai, Tamil Nadu, India
                </div>
              </div>
              <GuestDesp
                as={motion.p}
                initial="offscreen"
                whileInView="onscreen"
                varients={text}
              >
                {data.desc}
              </GuestDesp>
            </GuestImageDiv>
          );
        })}
      </GuestContainer>
    </GuestHead>
  );
}

export default Guest;
