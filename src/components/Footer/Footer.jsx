import React from "react";
import "./footer.scss";
import styled from "styled-components";
import dresteinLogo from "../../assets/dresteinLogo.svg";
import Avatar from "@mui/joy/Avatar";
import { Link } from "react-router-dom";
import Chip from "@mui/joy/Chip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../Admin/contexts/AdminContext";
import { useEffect } from "react";
import { useState } from "react";
import { Card } from "@mui/material";
const Footer = () => {
  const [views, setViews] = useState(localStorage.getItem("value"));

  useEffect(() => {
    setViews(parseInt(views));
  }, []);

  const LogoHead = styled.div`
    display: flex;
    width: fit-content;
    gap: 0.5rem;
    align-items: center;
    @media screen and (max-width: 600px) {
      width: 80%;
      margin-left: 3rem;
      justify-content: flex-start;
    }
  `;

  const DLogo = styled.img`
    width: 20%;
    @media screen and (max-width: 600px) {
    }
  `;
  const EventLogo = styled.div`
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 600px) {
    }
  `;
  const DresteinLetter = styled.p`
    font-size: 2.2vw;
    font-family: "Azonix", sans-serif;
    color: rgb(255, 255, 255);
    text-align: center;
    @media screen and (max-width: 600px) {
      font-size: 7vw;
    }
  `;
  const Year = styled.p`
    font-size: 1vw;
    font-family: Montserrat, sans-serif;
    font-weight: 800;
    color: rgb(255, 255, 255);
    text-align: center;
    height: auto;
    letter-spacing: 0.8em;
    @media screen and (max-width: 600px) {
      font-size: 3vw;
    }
  `;
  return (
    <div className="footer">
      <div className="flex container">
        <div className="block">
          <LogoHead>
            <DLogo src={dresteinLogo} alt="DresteinLogo" />
            <EventLogo>
              <DresteinLetter color="red">DRESTEIN</DresteinLetter>
              <Year>2 0 2 3</Year>
            </EventLogo>
          </LogoHead>
          <div className="desc">
            14<sup>th</sup> National level inter collegiate technical and
            management fest
          </div>
          <p
            style={{
              margin: "10px 0",
            }}
          >
           <h4 className="heading" align="center">Site Views</h4>
          </p>
          <Card
            sx={{
              border: "1px solid white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h1>{views}</h1>
            <VisibilityIcon
              sx={{
                fontSize: "40px",
              }}
            />
          </Card>
        </div>
        <div className="block">
          <h4 className="heading" align="center">CO-ORDINATORS</h4>
          <a href="https://www.saveetha.ac.in/index.php/2-uncategorised/489-dr-k-suresh-kumar-m-tech-ph-d"  target="_blank" class="links">
          <Chip
            size="lg"
            style={{ backgroundColor: "transparent", margin: "20px 0 " }}
            startDecorator={
              <Avatar
                size="lg"
                sx={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src="PeopleAssets/co1.webp"
              />
            }
          >
            Dr. K. Suresh Kumar
          </Chip>
          </a>
          <a href="https://www.saveetha.ac.in/index.php/departments/mechanical-engineering?id=661"  target="_blank" class="links">
          <Chip
            size="lg"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar
                size="sm"
                sx={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src="PeopleAssets/co2.webp"
              />
            }
          >
            Dr. N. Raja Rajeshwari
          </Chip>
          </a>
          <h4
            className="heading"
            style={{ marginTop: "2rem", marginBottom: "1rem" }} align="center"
          >
            WEBSITE CO-ORDINATORS
          </h4>
          <a href="https://www.linkedin.com/in/sugavarathan-l-400a46256/"  target="_blank" class="links">
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
            SUGAVARATHAN L
          </Chip>
          </a>
          <a href="https://www.linkedin.com/in/vishwa-raja-a59825210/"   target="_blank"class="links"> 
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
             VISHWARAJA R
          </Chip>
          </a>
          <a href="https://www.linkedin.com/in/itz-akash/"  target="_blank" class="links">
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
            AKASH A
          </Chip>
          </a>
          <a href="https://www.linkedin.com/in/vijayaragavan-arr/"  target="_blank" class="links">
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
            Vijayaragavan ARR
          </Chip>
          </a>
        </div>
        <div className="block">
        <h4 className="heading" align="center" >DSC MEMBERS</h4>
        <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
            R.Pavankumar	(Agri) 6383494421
          </Chip>
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
            Vijayaragavan ARR  (AIDS) 9443654516
          </Chip>
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
            Naveen Kumar A 	(AIML) 8925252883
          </Chip>
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
            H.S Dhanush 	(BIO-MEDICAL) 9789058816
          </Chip>
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
            Muhundhan M	(CIVIL) 9791389479
          </Chip>
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
            R.Pavankumar	(Agri) 6383494421
          </Chip>
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
            Srikanth T	(CHEMICAL) 6382979534
          </Chip>
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
            KISHORE.N	(CSE) 9894801443
          </Chip>
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
            R.Jayamani (CSE(Cyber Security)) 9962244445
          </Chip>
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
            Jessica.J	(ECE) 9345337659
          </Chip>
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
            Yeshwanth V	(EIE) 9342019960
          </Chip>
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
            Shanthini.S	(IT) 9025278040
          </Chip>
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
            Angappan.R	(MED) 9025864979
          </Chip>
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
           Kiran raaj k.v	(MECH) 9789994338
          </Chip>
          <Chip
            size="md"
            style={{ backgroundColor: "transparent" }}
            startDecorator={
              <Avatar size="sm" src={`/static/images/avatar/1.jpg`} />
            }
            >
           Amudhan. E. K 	(MBA) 7358736824
          </Chip>
        </div>
        <div className="block">
          <h4 className="heading">USEFUL LINKS</h4>
          <a href="#" className="links">
            Home
          </a>
          <a href="/Departments#" className="links">
            Departments
          </a>
          <Link to="/form" className="links">
            Register
          </Link>
          <Link to="/form" className="links">
            Events
          </Link>
          {/* <a href="#" className="links">
            Privacy Policy
          </a> */}
          <h4
            className="heading"
            style={{ marginTop: "2rem", marginBottom: "1rem" }}
          >
            SOCIALS
          </h4>
          <div class="social-links">
            <a
              target="_blank"
              href="https://m.facebook.com/story.php?story_fbid=pfbid0Dg1DrcX8xcWc4zXLjVjE9Bka8G6U3sqeLj3hNfFnZP8UZnSUqrwQgqgyGfDf3LkAl&id=61552576827758&sfnsn=wiwspwa&mibextid=RUbZ1f"
            >
              <FaFacebook />
            </a>
            <a target="_blank" href="https://twitter.com/drestein_in/status/1714284030588600527?t=tzQKp_5pV5pFIOh_iw6W3w&s=08">
              <FaTwitter />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/p/CygHkkgyiBI/?igshid=MTc4MmM1YmI2Ng"
            >
              <FaInstagram />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/drestein-in-93a163297/"
            >
              <FaLinkedinIn />
            </a>
            <a
              target="_blank"
              href="https://in.pinterest.com/saveethaengineering/"
            >
              <FaPinterest />
            </a>
          </div>
        </div>
        <div className="block">
          <h4 className="heading">LOCATION</h4>
          <p className="address">
            Saveetha Nagar, Sriperumbadur Taluk, Kanchipuram - Chennai Rd,
            Chennai, Tamil Nadu 602105
          </p>
          <div class="mapouter">
            <div class="gmap_canvas">
              <iframe
                style={{
                  borderRadius: "10px",
                }}
                class="gmap_iframe"
                width="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?width=250&amp;height=250&amp;hl=en&amp;q=Saveetha engineering college&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        Copyright © Saveetha Engineering College, Powered by Drestein.
      </div>
    </div>
  );
};

export default Footer;