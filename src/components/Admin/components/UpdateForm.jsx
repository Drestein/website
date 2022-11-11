import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useState } from "react";
import Checkbox from "@mui/joy/Checkbox";
import Chip from "@mui/joy/Chip";
import FilledInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/joy/FormControl";
import FormControlM from "@mui/material/FormControl";
import SelectM from "@mui/material/Select";
import { useEffect } from "react";
import { Alert } from "@mui/material";
import { Stack } from "@mui/system";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../configs/Firebase.config";
import { toast } from "react-toastify";
import Loading from "../../../Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #bfbfbf",
  backgroundColor: "#ffffff",
  color: "black",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

export default function UpdateForm({
  DepartEvent,
  EventsRegistered,
  ProjectPresentation,
  PaperPresentation,
  CashToBePaid,
  id,
  AmountPaid,
  cashPaid,
  cashPaidForPaper,
  cashPaidForProject,
}) {
  const [open, setOpen] = React.useState(false);
  const [load, setload] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Pay, setPay] = useState(CashToBePaid);
  const [Event, setEvent] = useState(DepartEvent);
  const [Project, setProject] = React.useState(ProjectPresentation);
  const [Paper, setPaper] = React.useState(PaperPresentation);

  const [eventName, setEventName] = React.useState(EventsRegistered);

  const [DepPaid, setDepPaid] = useState(cashPaid);
  const [paperPaid, setpaperPaid] = useState(cashPaidForPaper);
  const [ProjectPaid, setProjectPaid] = useState(cashPaidForProject);

  const prevProject = ProjectPresentation;
  const prePaper = PaperPresentation;

  const handleChangeT = (event) => {
    // console.log('this ',event.target.name)

    const {
      target: { value, name },
    } = event;

    // setEventName(typeof value === "string" ? value.split(",") : value);

    setEventName((pre) => ({ ...pre, [name]: [...value] }));
  };
  useEffect(() => {
    setDepPaid(cashPaid);
    setProjectPaid(cashPaidForProject);
    setpaperPaid(cashPaidForPaper);
  }, [cashPaidForPaper, cashPaidForProject, cashPaid]);
  const test = [
    {
      name: "CSE",
      events: ["The Lost Code", "UI Design", "Blind Coding", "Ideathon"],
    },
    {
      name: "IT",
      events: ["Switcheroo", "Game of Codes", "Cipher Hunt", "Codeverse"],
    },
    {
      name: "ECE",
      events: ["eceevent1", "eceevent2"],
    },
    {
      name: "EEE",
      events: ["EEEevent1", "EEEevent2"],
    },
    {
      name: "EIE",
      events: ["Fire Tech", "Tech puzzle", "Debugging theorem", "Instantrix"],
    },
    {
      name: "AGRI",
      events: [
        "SHERLOCK HOLMES",
        "DEVILS ADVOCATE",
        "TREASURE HUNT",
        "NEURO COMBAT",
      ],
    },
    {
      name: "AI",
      events: [
        "Code and Debug",
        "Shark Tank",
        "Memesrus",
        "WEB CON",
        "Data Hunt",
      ],
    },
    {
      name: "BME",
      events: [
        "Med factory",
        "Mind Flayers",
        "Kampf geist",
        "Neurotic Expelliarmus",
      ],
    },
    {
      name: "CIVIL",
      events: ["Build-IT", "MAP THE GAP", "CADD Modeling", "Code cracking"],
    },
    {
      name: "CHEM",
      events: ["PROCESS SNIPPET", "CHEM FLUIDS", "CLASH XCAPE", "CHEM BRIDGE"],
    },
    {
      name: "MECH",
      events: [
        "Dezania",
        "Mr. Machinist",
        "Water Rocketry",
        "Cad Modelling And Stimulation",
      ],
    },
    {
      name: "MBA",
      events: ["Test", "Test2"],
    },
    {
      name: "MED",
      events: ["Test", "Test2"],
    },
  ];

  const handleUpdateForm = async () => {
    setload(true);
    console.log(Event, Project, Paper, eventName);
    let Amountpaid = 0;
    let totalAmount = 0;
    // setload(true);
    console.log({ cashPaidForPaper, cashPaidForProject, cashPaid });
    console.log({
      paperPaid,
      ProjectPaid,
      DepPaid,
    });

    console.log(Amountpaid);
    // setChecked(pre=>!pre)
    const docRef = doc(db, "RegisteredPeople", `${id}`);
    if (paperPaid && Paper) {
      console.log("paper running");
      Amountpaid += 200;
    }
    if (ProjectPaid && Project) {
      console.log("Project running");
      Amountpaid += 250;
      console.log(Amountpaid);
    }
    if (DepPaid && Event) {
      console.log("event running");
      Amountpaid += 150;
    }
    //check for total amount
    if (Event) {
      totalAmount += 150;
    }
    if (Project) {
      totalAmount += 250;
    }
    if (Paper) {
      totalAmount += 200;
    }

    console.log(Amountpaid);
    await updateDoc(docRef, {
      CashToBePaid: totalAmount,
      DepartEvent: Event,
      ProjectPresentation: Project,
      PaperPresentation: Paper,
      EventsRegistered: eventName,
      AmountPaid: Amountpaid,
      cashPaid: DepPaid,
      cashPaidForPaper: paperPaid,
      cashPaidForProject: ProjectPaid,
    }).then(() => {
      setload(false);
      toast.success("profile updated");

      // console.log("this is loaf",load.current)
    });
  };
  return (
    <div>
      {load && <Loading />}
      <Button onClick={handleOpen} variant="contained">
        Update
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {/* {load && <Loading/>} */}
          <Box sx={style}>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Checkbox
                color="primary"
                size="lg"
                label="Events"
                defaultChecked={DepartEvent}
                onChange={(e) => {
                  if (Event === true) {
                    setPay(Pay - 150);
                    if (DepPaid) {
                      // console.log("Event Amount ", Amountpaid);
                      setDepPaid(false);
                    }
                    setEventName(EventsRegistered);
                  } else {
                    setPay(Pay + 150);
                  }
                  setEvent(e.target.checked);
                }}
              />

              <Checkbox
                color="primary"
                size="lg"
                label="Paper Presentation"
                defaultChecked={Paper}
                onChange={(e) => {
                  if (Paper === true) {
                    setPay(Pay - 200);
                    if (paperPaid) {
                      setpaperPaid(false);
                    }
                    setEventName(EventsRegistered);
                  } else {
                    setPay(Pay + 200);
                  }
                  setPaper(e.target.checked);
                }}
              />
              <Checkbox
                color="primary"
                size="lg"
                label="Project Display"
                defaultChecked={Project}
                onChange={(e) => {
                  if (Project === true) {
                    setPay(Pay - 250);
                    if (ProjectPaid) {
                      setProjectPaid(false);
                    }
                    setEventName(EventsRegistered);
                  } else {
                    setPay(Pay + 250);
                  }
                  setProject(e.target.checked);
                }}
              />
            </div>
            {Event === true ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {test.map((depart) => {
                  return (
                    <FormControlM
                      style={{ margin: "10px", width: "30%" }}
                      // sx={{ m: 1, width: "30%" }}
                    >
                      <InputLabel>{depart.name}</InputLabel>
                      <SelectM
                        multiple
                        value={eventName[depart.name]}
                        name={depart.name}
                        onChange={handleChangeT}
                        input={<FilledInput label={depart.name} />}
                        renderValue={(selected) => (
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.5,
                            }}
                          >
                            {selected.map((value) => (
                              <Chip key={value}>{value}</Chip>
                            ))}
                          </Box>
                        )}
                      >
                        {depart.events.map((ev) => (
                          <MenuItem key={ev} value={ev}>
                            {ev}
                          </MenuItem>
                        ))}
                      </SelectM>
                    </FormControlM>
                  );
                })}
              </div>
            ) : null}
            <Stack alignItems="center" padding="30px" spacing={2}>
              <Alert severity="warning"> this User needs to Pay {Pay} ₹ </Alert>
              <Button
                onClick={handleUpdateForm}
                size="large"
                variant="contained"
              >
                {" "}
                Update{" "}
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
