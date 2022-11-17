import React, { useEffect } from "react";
import "./styles/form.css";
import Nav from "../Nav/Nav";
import { useState } from "react";
import { deepmerge } from "@mui/utils";
import { experimental_extendTheme as extendMuiTheme } from "@mui/material/styles";
import colors from "@mui/joy/colors";
import {
  extendTheme as extendJoyTheme,
  CssVarsProvider,
  useColorScheme,
} from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/joy/FormControl";
import FormControlM from "@mui/material/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Option from "@mui/joy/Option";
import Divider from "@mui/joy/Divider";
import Select from "@mui/joy/Select";
import SelectM from "@mui/material/Select";
import Checkbox from "@mui/joy/Checkbox";
import Alert from "@mui/joy/Alert";
import { uuidv4 } from "@firebase/util";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/Firebase.config";
import { setDoc } from "firebase/firestore";
import Loading from "../../Loading";
import ConfirmCard from "./ConfirmCard";
import Chip from "@mui/joy/Chip";
import FilledInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import IdCardUpload from "./IdCardUpload";
import Footer from "../Footer/Footer";
import { getDocs } from "firebase/firestore";
import { collection, where, onSnapshot, query } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const muiTheme = extendMuiTheme({
  cssVarPrefix: "joy",
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: colors.blue[500],
        },
        grey: colors.grey,
        error: {
          main: colors.red[500],
        },
        info: {
          main: colors.purple[500],
        },
        success: {
          main: colors.green[500],
        },
        warning: {
          main: colors.yellow[200],
        },
        common: {
          white: "#FFF",
          black: "#09090D",
        },
        divider: colors.grey[200],
        text: {
          primary: colors.grey[800],
          secondary: colors.grey[600],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: colors.blue[600],
        },
        grey: colors.grey,
        error: {
          main: colors.red[600],
        },
        info: {
          main: colors.purple[600],
        },
        success: {
          main: colors.green[600],
        },
        warning: {
          main: colors.yellow[300],
        },
        common: {
          white: "#FFF",
          black: "#09090D",
        },
        divider: colors.grey[800],
        text: {
          primary: colors.grey[100],
          secondary: colors.grey[300],
        },
      },
    },
  },
});

const joyTheme = extendJoyTheme();
const theme = deepmerge(muiTheme, joyTheme);
function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button variant="outlined" color="neutral" onClick={() => setMode("dark")}>
      Test
    </Button>
  );
}

const Form = () => {
  const [formdata, setformdata] = useState({});
  const [qr, setqr] = useState("");
  const [load, setload] = useState(false);
  const [confirmMsg, setconfirmMsg] = useState(false);
  const [Project, setProject] = React.useState(false);
  const [Paper, setPaper] = React.useState(false);
  const [Event, setEvent] = useState(false);
  const [Pay, setPay] = useState(0);
  const [img, setImg] = useState(null);
  const [imgload, setimgload] = useState(false);
  useEffect(() => {
    document.body.style.overflow = "unset";
  }, []);

  const [eventName, setEventName] = React.useState({
    CSE: [],
    IT: [],
    EEE: [],
    ECE: [],
    EIE: [],
    MECH: [],
    CIVIL: [],
    MED: [],
    CHEM: [],
    AGRI: [],
    AI: [],
    MBA: [],
    BME: [],
  });
  const [userExist, setUserExist] = useState([]);

  const [userExistError, setUserExistError] = useState(false);

  const handleChange = (e) => {
    setUserExistError(false);
    setformdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // const FF = (Qr,id,name) => {
  //   return (

  //   );
  // };
  const uploadProfileImg = async (id) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      // const fileName = `${id}-${img.name}-${uuidv4()}`;
      const storageRef = ref(storage, "images/" + id);

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          //  setProgress(progress)
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");

              break;
          }
        },
        (error) => {
          reject(error);
          setload(false);
          toast.error("resize your image");
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            resolve(downloadURL);
            formdata.IdCard = downloadURL;

            const cityRef = doc(db, "RegisteredPeople", `${formdata.id}`);

           await setDoc(cityRef, formdata)
              .then(async () => {

                const sendqr = await fetch(
                  `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=https://drestein.in/user/${cityRef.id}&choe=UTF-8`
                );
                const QrUrl = sendqr.url;
                // console.log(QrUrl);
                if (window.Email) {

                  console.log(window.Email)
                  const style = {
                    border: "1px sold black",
                  };
                  await window.Email.send({
                    SecureToken: process.env.REACT_APP_EMAILCODE_ID,
                    To: formdata.email,

                    From: "dresteinsaveetha2022@gmail.com",

                    Subject:
                      "Congrats! Your registration for Drestein is complete 🎉",

                    Body: `
                       <h2>Congrats ${formdata.fname},</h2>
                    <p>
                        Thank you for registering. You have applied for <b>${
                          formdata.DepartEvent ? `Events(₹150)` : ""
                        }
                    ${
                      formdata.PaperPresentation
                        ? `, Paper Presentation(₹200)`
                        : ""
                    }${
                      formdata.ProjectPresentation
                        ? `, Project Presentation(₹250)`
                        : ""
                    }.
                    </b> Don't worry if you missed an event; you can register for other events offline after coming to Saveetha Engineering College. The registration fee has to be paid at the registration counter on the day of the event by scanning your QR code sent in this email. We expect your presence on this auspicious day.
                    </p>  
                   
                      Total amount to be paid: <b>₹${
                        formdata.CashToBePaid
                      } (Cash only)</b>
                    </p>

              
                    <h3>Best Wishes, Drestein team</h3>
                    <img src="${QrUrl}" alt='${formdata.id}'>
                    `,
                  }).then(() => {
                    setload(false);
                    setconfirmMsg(true);
                  });
                }
              })
              .catch((e) => {
                toast.error(e);
              });
          });
        }
      );
    });
  };
  function isuserAlreadyExist(email) {
    return new Promise((resolve, reject) => {
      const colref = collection(db, "RegisteredPeople");
      const q = query(colref, where("email", "==", email));

      getDocs(q)
      .then((snapshot) => {
        let books = [];

        snapshot.docs.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id });
        });


        setUserExist(books);
        resolve(books);

      });
    });
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (img === null) {
      toast.error("Upload you colllege Id Card photo", {
        theme: "dark",
        position: "bottom-left",
      });
      return false;
    }
    if (Project === false && Paper === false && Event === false) {
      toast.info("Select At least one event", {
        theme: "dark",
        position: "bottom-left",
      });
      setload(false);
      return false;
    }
    setload(true);
    const response = await isuserAlreadyExist(formdata.email);

    // console.log("this is ths i",userExist)
    console.log(response)

    formdata.id = uuidv4();

    formdata.cashPaid = false;

    formdata.cashPaidForPaper = false;

    formdata.cashPaidForProject = false;

    formdata.CashToBePaid = 0;

    formdata.EventsRegistered = eventName;

    formdata.PaperPresentation = Paper;

    formdata.ProjectPresentation = Project;

    formdata.AmountPaid = 0;

    // for (const key in eventName) {
    //   console.log("thisd:", eventName[key]);
    //   if (!isEmpty(eventName[key])) {
    //     formdata.CashToBePaid += 150;
    //     formdata.DEvent = true;
    //   }
    // }
    formdata.DepartEvent = Event;
    formdata.timestamp = serverTimestamp();

    if (Event === true) {
      formdata.CashToBePaid += 150;
    }
    if (Paper === true) {
      formdata.CashToBePaid += 200;
    }
    if (Project === true) {
      formdata.CashToBePaid += 250;
    }
    console.log(formdata);
    if (response[0] === undefined) {
      console.log(formdata.id);

      uploadProfileImg(formdata.id);
    } else {
      setload(false);
      setUserExistError(true);
      toast.error("user Already exist", {
        position: "bottom-left",
      });
    }
  };

  const handleChangeForSelect = (e) => {
    const name = e.target.getAttribute("data-name");
    setformdata((prev) => ({
      ...prev,
      [name]: e.target.innerHTML,
    }));
  };

  // useEffect(() => {
  //   console.log(eventName);
  // }, [eventName]);

  const handleChangeT = (event) => {
    const {
      target: { value, name },
    } = event;
    setEventName((pre) => ({ ...pre, [name]: [...value] }));
    console.log(eventName);
  };

  const test = [
    {
      name: "CSE",
      events: [
        "The Lost Code",
        "Design Space",
        "Sightless Snippets",
        "Dare to Compete",
      ],
    },
    {
      name: "IT",
      events: ["Switcheroo", "Game of Codes", "Cipher Hunt", "Codeverse"],
    },
    {
      name: "ECE",
      events: ["ElectroBlitz", "CRYOSAT", "Circuit Buzz", "Obstacle Mania"],
    },
    {
      name: "EEE",
      events: ["ROBO SOCCER CHALLENGE", "Techisetz", "BRAIN SCAPE", "RAIKIRI"],
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
      events: [
        "Adzap",
        "Business Quiz",
        "FUTURE MANAGER",
        "Imagine Through Lens",
      ],
    },
    {
      name: "MED",
      events: ["Anatomia", "CIRCUITO", "CONNECTIONS", "BLIND TEASER"],
    },
  ];

  return (
    <div className="headcontainer" data-joy-color-scheme="dark">
      {load && <Loading />}
      <Nav />
      {confirmMsg ? (
        <ConfirmCard />
      ) : (
        <div
          className="main-form"
          style={{
            maxWidth: "100%",
            margin: "0 auto",
          }}
        >
          <CssVarsProvider theme={theme} className="formsheet">
            {0 ? (
              <div
                style={{
                  fontSize: "2vw",
                  display: "flex",
                  justifyContent: "center",
                  height: "80vh",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                Registeration disabled due to technical difficulties, kindly
                check back later!
              </div>
            ) : null}
            {1 ? (
              <form
                onSubmit={handlesubmit}
                style={{ marginInline: "auto" }}
                autocomplete="off"
              >
                <Sheet
                  sx={{
                    mx: 2,
                    my: 2,
                    py: 2,
                    px: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    borderRadius: "sm",
                    boxShadow: "md",
                  }}
                  style={{ backgroundColor: "rgb(0 0 29 / 60%)" }}
                  variant="outlined"
                  className="formcontainer"
                >
                  <div>
                    <Typography level="h4" component="h1">
                      <b>Register!</b>
                    </Typography>
                    <Typography level="body2">
                      Register now to take part in events.
                    </Typography>
                  </div>
                  <Divider />
                  <div className="Name">
                    <TextField
                      name="fname"
                      required
                      value={formdata.fname}
                      onChange={handleChange}
                      type="text"
                      placeholder="John"
                      label="First Name"
                      sx={{ width: "48%" }}
                    />

                    <TextField
                      name="lname"
                      value={formdata.lname}
                      onChange={handleChange}
                      type="text"
                      placeholder="Doe"
                      label="Last Name"
                      sx={{ width: "48%" }}
                    />
                  </div>
                  <TextField
                    name="college"
                    required
                    value={formdata.college}
                    onChange={handleChange}
                    type="text"
                    placeholder="College name..."
                    label="College Name"
                  />
                  <div className="yearno">
                    <TextField
                      name="regno"
                      required
                      value={formdata.regno}
                      onChange={handleChange}
                      type="number"
                      placeholder="Register number..."
                      label="Register Number"
                      sx={{ width: "48%" }}
                    />
                    <FormControl
                      required
                      sx={{
                        width: "48%",
                      }}
                    >
                      <FormLabel htmlFor="year">Year</FormLabel>
                      <Select
                        id="year"
                        data-name="year"
                        placeholder="Year..."
                        value={formdata.year}
                        onChange={handleChangeForSelect}
                      >
                        <Option data-name="year" value="1">
                          I
                        </Option>
                        <Option data-name="year" value="2">
                          II
                        </Option>
                        <Option data-name="year" value="3">
                          III
                        </Option>
                        <Option data-name="year" value="4">
                          IV
                        </Option>
                      </Select>
                    </FormControl>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextField
                      name="dept"
                      required
                      value={formdata.dept}
                      onChange={handleChange}
                      type="text"
                      placeholder="Department..."
                      label="Department"
                      sx={{ width: "48%" }}
                    />
                    <FormControl
                      required
                      sx={{
                        width: "48%",
                      }}
                    >
                      <FormLabel htmlFor="gender">Gender</FormLabel>
                      <Select
                        id="gender"
                        name="gender"
                        placeholder="Gender..."
                        value={formdata.gender}
                        onChange={handleChangeForSelect}
                      >
                        <Option data-name="gender" value="1">
                          Male
                        </Option>
                        <Option data-name="gender" value="2">
                          Female
                        </Option>
                        <Option data-name="gender" value="3">
                          Other
                        </Option>
                        <Option data-name="gender" value="4">
                          Prefer Not To Say
                        </Option>
                      </Select>
                    </FormControl>
                  </div>

                  <TextField
                    name="phno"
                    required
                    type="number"
                    value={formdata.phno}
                    onChange={handleChange}
                    placeholder="98765*****"
                    label="Phone Number"
                  />
                  <TextField
                    name="email"
                    required
                    value={formdata.email}
                    onChange={handleChange}
                    type="email"
                    error={userExistError}
                    helperText={
                      userExistError
                        ? "Already Registered with is mail id !"
                        : ""
                    }
                    placeholder="johndoe@email.com"
                    label="Email"
                  />

                  <Box
                    required
                    role="group"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      marginTop: "1rem",
                    }}
                    className="formcheck"
                  >
                    <Checkbox
                      className="check"
                      color="primary"
                      size="lg"
                      label="Events"
                      onChange={(e) => {
                        if (Event === true) {
                          setPay(Pay - 150);
                          setEventName({
                            CSE: [],
                            IT: [],
                            EEE: [],
                            ECE: [],
                            EIE: [],
                            MECH: [],
                            CIVIL: [],
                            MED: [],
                            CHEM: [],
                            AGRI: [],
                            AI: [],
                            MBA: [],
                            BME: [],
                          });
                        } else {
                          setPay(Pay + 150);
                        }
                        setEvent(e.target.checked);
                      }}
                    />

                    <Checkbox
                      className="check"
                      color="primary"
                      size="lg"
                      label="Paper Presentation"
                      onChange={(e) => {
                        if (Paper === true) {
                          setPay(Pay - 200);
                        } else {
                          setPay(Pay + 200);
                        }
                        setPaper(e.target.checked);
                      }}
                    />
                    <Checkbox
                      className="check"
                      color="primary"
                      size="lg"
                      label="Project Display"
                      onChange={(e) => {
                        if (Project === true) {
                          setPay(Pay - 250);
                        } else {
                          setPay(Pay + 250);
                        }
                        setProject(e.target.checked);
                      }}
                    />
                  </Box>
                  {Event === true ? (
                    <div>
                      <Divider sx={{ "--Divider-childPosition": `50%` }}>
                        Department Events
                      </Divider>
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
                              className="sel"
                              style={{ margin: "10px" }}
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
                    </div>
                  ) : null}

                  <div>
                    <IdCardUpload setImg={setImg} img={img} />
                  </div>
                  {Pay === 0 ? null : (
                    <Alert
                      variant="outlined"
                      color="danger"
                      sx={{
                        align: "center",
                        justifyContent: "center",
                      }}
                    >
                      Registeration Fee of {Pay} has to be paid on the event
                      date.
                    </Alert>
                  )}
                  {load && (
                    <Alert
                      variant="outlined"
                      color="danger"
                      sx={{ align: "center", zIndex: 1000 }}
                    >
                      processing your data don't reload the page
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    value={load ? "Processing" : "Register"}
                    disabled={load}
                    sx={{ mt: 1 }}
                  >
                    Register
                  </Button>
                </Sheet>
              </form>
            ) : null}
          </CssVarsProvider>
        </div>
      )}
    </div>
  );
};

export default Form;
