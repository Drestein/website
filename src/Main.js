import React, { useRef, useCallback, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion, useScroll, useTransform } from "framer-motion";
import { Particle } from "./configs/partical.config";
import styled from "styled-components";
import Departments from "./components/event/Departments";
// import Gallery from "./components/Gallery/Gallery";
import Gallery2022 from "./components/Gallery/Gallery2022";
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import Link from "./components/Link/Header";
import About from "./components/About/About";
import Guest from "./components/Guest/Guest";
import Footer from "./components/Footer/Footer";
import "./App.css";
import Counter from "./components/counter/Counter";
import { fontWeight } from "@mui/system";
// import Departments from "./components/Departments/comman events";
const DepartmentDiv = styled.div`
  position: sticky;
`;

const Main = () => {
  const scroll = useRef(null);
  const { scrollY } = useScroll();
  const MValue = useTransform(scrollY, [0, 800], [0, -200]);
  const DValue = useTransform(scrollY, [0, 1000], [0, -500]);
  const { scrollYProgress } = useScroll();
  
  const DeviceSize = window.innerWidth;

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  useEffect(() => {
    document.body.style.overflow = "unset";
  }, []);

  return (
    <div
      ref={scroll}
      id="#"
      style={{
        userSelect: "none",
      }}
    >
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
      <Nav />
      <Header />
      <motion.div
        className="img"
        style={{ y: DeviceSize < 800 ? MValue : DValue, zIndex: -1 }}
      ></motion.div>

        <div id="Count" style={{ width: "100%" }}>
          <Counter />
        </div>

      {/* <DepartmentDiv id="comman events">
        <comman />
      </DepartmentDiv> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="GalleryHeadTxt" style={{}}>
          Banner
        </div>
        <img
          width="80%"
          style={{
            borderRadius: "20px",
            margin: "2rem  0",
          }}
          height="100%"
          src="OtherAssets/poster.webp"
          alt="banner"
        />
      </div>

      <DepartmentDiv id="event">
        <Departments />
      </DepartmentDiv>
  
      <Link />
      <div id="Gallery2022">
        <Gallery2022 />
      </div>
      
      
      {/* <div id="SECLife">
        <About />
      </div> */}
      {/* <div id="Guest">
        <Guest />
      </div> */}

      <div id="About">
        <Footer />
      </div>
    </div>
  );
};

export default Main;
