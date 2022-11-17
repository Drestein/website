import React from "react";
import styled from "styled-components";
import DepartMentCard from "./DepartMentCard";
import { departobj, comobj } from "../../configs/Departments.config";
import { motion } from "framer-motion";
import SpacialEventsCard from "./SpecialEventsCard";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import RegisterBtn from "../register-button/RegisterBtn";
import { Card } from "@mui/material";
import { width } from "@mui/system";
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

          return <div key={i} onClick={handleOpen}><SpacialEventsCard   {...data} /> </div>;
        })}
      </DepartmentContainer>
      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box sx={
          {
            position: 'absolute',
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxHeight:'600px',
            overflowY:'scroll',
            background:'black',
            color:'white',
            border:'1px solid gray',

            p: 4,
          }
        }>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Project Presentation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ul>

              <li style={{
                padding:'5px 0'
              }}>  Students are invited to present project works based on their innovative ideas / research at this symposium <strong>DRESTEIN2022</strong>.</li>
              <li style={{
                padding:'5px 0'
              }}> The projects could be on any topic relevant to the engineering disciplines.</li>
              <li style={{
                padding:'5px 0'
              }}>Registration fee per project -  Rs. 250/-</li>
              <li style={{
                padding:'5px 0'
              }}>Registration fee has to be paid in the registration counter</li>
              
              </ul>
        

         





          <Typography id="modal-modal-title" variant="h6" sx={{

          }} component="h3">
           <strong>RULES</strong>   
          </Typography>

          

          <ul>

<li style={{
  padding:'5px 0'
}}>  Maximum number of participants in project group is limited to three.</li>
<li style={{
  padding:'5px 0'
}}> One person cannot be part of more than one project group. </li>
<li style={{
  padding:'5px 0'
}}>Participant should prepare posters to descibe about the project.</li>




</ul>
<Typography
              id="modal-modal-title"
              variant="h6"
              sx={{}}
              component="h3"
            >
              <strong>FACULTY COORDINATOR</strong>
            </Typography>

            <ul>
              <li
                style={{
                  padding: "5px 0",
                }}
              >
                Dr. Gopal Ramasubramaniyan (9444167442)
              </li>
            </ul>

 </Typography>
 <a
              onClick={handleClose}
              href='https://drestein.in/form'
              className="btn"
              style={{ textDecoration: "none" ,display:'flex',justifyContent:'center',alignItems:'center'}}
            >
              <RegisterBtn />
            </a>
        </Box>
      </Modal>
    </>
  );
}

export default Departments;
