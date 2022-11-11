import Nav from "../Nav/Nav";
import "./styles/events.scss";
import React, { useRef, useCallback, useEffect, useState } from "react";

import { EventDetails } from "../../configs/EventDetails";
import EventCard from "./EventCard";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
// import { motion, useScroll, useTransform } from "framer-motion";
import { Particle } from "../../configs/partical.config";
// import React, { useState, useEffect } from "react"
import Modal from "./Modal.jsx";
import { motion, useScroll, useTransform } from "framer-motion";
const Events = () => {
  const [openModal, setOpenModal] = useState(false);
  const { scrollY } = useScroll();
  const MValue = useTransform(scrollY, [0, 800], [0, -200]);
  const DValue = useTransform(scrollY, [0, 1000], [0, -500]);
  const { scrollYProgress } = useScroll();
  const DeviceSize = window.innerWidth;

  useEffect(() => {
    openModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [openModal]);
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);
  const particlesLoaded = useCallback(async (container) => {}, []);
  useEffect(() => {
    document.body.style.overflow = "unset";
  }, []);

  return (
    <>
      <motion.div
        className="scrollprogress"
        style={{ scaleX: scrollYProgress }}
      />
      <Particles
        className="particles"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={Particle}
      />
      <Modal open={openModal} setOpenModal={setOpenModal} />
      <div className="event-page" id="#">
        <Nav />
        <div className="event-container">
          {EventDetails.map((EachDept) => {
            return (
              <>
                <div className="top" id={EachDept.id}>
                  <div className="title">{EachDept.title}</div>
                </div>
                <div className="wrapper">
                  {EachDept.eventslist.map((EachEvent) => {
                    return (
                      <EventCard
                        key={EachEvent.id}
                        {...EachEvent}
                        setOpenModal={setOpenModal}
                      />
                    );
                  })}
                  {EachDept.workshopslist?.map((EachWorkshop) => {
                    return (
                      <EventCard
                        {...EachWorkshop}
                        setOpenModal={setOpenModal}
                      />
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Events;
