import React from "react";
import styled from "styled-components";
import "./styles/DepartMentCard.css";
import { motion } from "framer-motion";
import { HashLink as Link } from "react-router-hash-link";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";
const Card = styled.a`
    font-family: "poppins", sans-serif;
    position: relative;
    width: 300px;
    height: 400px;
    background: #00001d;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(11.5px);
    -webkit-backdrop-filter: blur(11.5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    overflow: hidden;
    z-index: 100;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${props => props.color &&  props.color};
      clip-path: circle(150px at 80% 20%);
      transition: 0.7s ease all;
    }
    &::after {
      font-family: "poppins", sans-serif;
      content: ${props => props.color && `${props.color}`};;
      opacity: 0.3;
      position: absolute;
      top: 50%;
      left: -20%;
      font-size: 10em;
      font-weight: 800;
      font-style: italic;
      color: ${props => props.color &&  props.color};
    }
  `;

const DeptTxt = styled.h2`
font-size: 1.5em;
position: relative;
font-weight: 600;
letter-spacing: 1px;
color: #fff;
margin-top: ${props=>props.mbtm && props.mbtm};
`;


function SpacialEventsCard({ img, title, des, color, bgtext, mbtm, id }) {
  const a = title.split(" ");


  
  const text = {
    offscreen: { y: 200, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1,
      },
    },
  };

  const cardimg = {
    offscreen: { y: 200, opacity: 0 },
    onscreen: {
      y: 10,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1,
      },
    },
  };

  const device = window.innerWidth;

  const cardforMobile = {
    offscreen: { x: -100, opacity: 0 },
    onscreen: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
  };

  const cardforDesktop = {
    offscreen: { y: -100, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  


  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
      variants={device < 700 ? cardforMobile : cardforDesktop}
      className="containerdept"

    >
      
      <Card 
        color={color}
        bgtext={bgtext}
        href="#"
        as={motion.div}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          staggerChildren: 0.5,
        }}
        className="card"
      >
        <div
          class="imgBx"
          style={{
            width: "100%",
            maxHeight: "150px",
            margin: "20px 0",
          }}
          variants={text}
        >
          <motion.div variants={cardimg}>
            <img
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                borderRadius: "20px",
                objectFit: "cover",
              }}
              src={img}
              alt="department"
            />
          </motion.div>
        </div>
        <div className="contentBx">
          <DeptTxt mbtm={mbtm}  as={motion.div} variants={text}>
            {a[0]}
            <br />
            {a[1]}
          </DeptTxt>
        </div>
      </Card>
    </motion.div>
  );
}

export default SpacialEventsCard;
