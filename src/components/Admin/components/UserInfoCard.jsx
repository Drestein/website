import React, { useEffect } from "react";
import styled from "styled-components";
import Loading from "../../../Loading";
import { Button, Switch } from "@mui/material";
import { useState } from "react";
import { doc } from "firebase/firestore";
import { db } from "../../../configs/Firebase.config";
import { updateDoc } from "firebase/firestore";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { isEmpty } from "@firebase/util";
import { Card } from "@mui/material";
import { width } from "@mui/system";
import UpdateForm from "./UpdateForm";
import supabase from "../../../client";
const UserCard = styled.div`
  width: 100%;
  color: #000000;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 1rem;
  background: ${(props) =>
    props.paid && props.PaperPaid && props.ProjectPaid
      ? "#bbffca;"
      : "#fdaeae"};

  /* background: #f8f8f8; */
`;

function UserInfoCard({ data, Scanpage }) {
  const [load, setload] = useState(false);

  const {
    lname,
    fname,
    college,
    cashPaid,
    dept,
    gender,
    year,
    regno,
    id,
    EventsRegistered,
    AmountPaid,
    PaperPresentation,
    ProjectPresentation,
    cashPaidForPaper,
    cashPaidForProject,
    CashToBePaid,
    DepartEvent,
    email,
    phno,
    IdCard,
  } = data;

  // console.log(AmountPaid);

  const handleChange = async (e, id, AmountPaid) => {
    setload(true);
    // setChecked(pre=>!pre)
    const docRef = doc(db, "RegisteredPeople", `${id}`);
    console.log(e.target.checked);
    let amount = 0;
    if (e.target.checked) {
      amount = AmountPaid + 150;
    } else {
      amount = AmountPaid - 150;
    }
    const {data,error}  = await supabase
    .from('RegisteredPeople')
    .update( {
      cashPaidForProject: e.target.checked,
      AmountPaid: amount,
    })
    .eq('userRef',id)
    // await updateDoc(docRef, {
    //   cashPaid: e.target.checked,
    //   AmountPaid: amount,
    // }).then(() => {
    //   setload(false);
    //   toast.success("profile updated");

    //   // console.log("this is loaf",load.current)
    // });
    // console.log(e.target.checked)
  };
  // useEffect(() => {
    // console.log("this happend ", cashPaid);
  // }, [cashPaid]);

  const handleChangeforProject = async (e, id, AmountPaid) => {
    setload(true);
    // setChecked(pre=>!pre)
    const docRef = doc(db, "RegisteredPeople", `${id}`);
    console.log(e.target.checked);
    let amount = 0;
    if (e.target.checked) {
      amount = AmountPaid + 250;
    } else {
      amount = AmountPaid - 250;
    }
 
    const {data,error}  = await supabase
    .from('RegisteredPeople')
    .update( {
      cashPaidForProject: e.target.checked,
      AmountPaid: amount,
    })
    .eq('userRef',id)

    // await updateDoc(docRef,).then(() => {
    //   setload(false);
    //   toast.success("profile updated");

    //   // console.log("this is loaf",load.current)
    // });
    // console.log(e.target.checked)
  };

  const handleChangeforPaper = async (e, id, AmountPaid) => {
    setload(true);
    // setChecked(pre=>!pre)
    const docRef = doc(db, "RegisteredPeople", `${id}`);
    console.log(e.target.checked);
    let amount = 0;

    if (e.target.checked) {
      amount = AmountPaid + 200;
    } else {
      amount = AmountPaid - 200;
    }

    const {data,error}  = await supabase
    .from('RegisteredPeople')
    .update( {
      cashPaidForPaper: e.target.checked,
      AmountPaid: amount,
    })
    .eq('userRef',id)
    
    // await updateDoc(docRef, {
    //   cashPaidForPaper: e.target.checked,
    //   AmountPaid: amount,
    // }).then(() => {
    //   setload(false);
    //   toast.success("profile updated");

    //   // console.log("this is loaf",load.current)
    // });
    // console.log(e.target.checked)
  };

  const deptnames = [
    "IT",
    "CSE",
    "ECE",
    "EEE",
    "EIE",
    "MECH",
    "AI",
    "CHEM",
    "MBA",
    "MED",
    "AGRI",
    "CIVIL",
    "BME",
  ];

  return (
    <UserCard
      paid={DepartEvent ? cashPaid : true}
      PaperPaid={PaperPresentation ? cashPaidForPaper : true}
      ProjectPaid={ProjectPresentation ? cashPaidForProject : true}
    >
      {load && <Loading />}
      <Card
        sx={{
          padding: "20px",
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          alignItems="start"
          justifyContent="space-between"
        >
          <div>
            <p
              style={{
                padding: "5px",
              }}
            >
              Name: {fname + " " + lname}
            </p>
            <p
              style={{
                padding: "5px",
              }}
            >
              Rgister No: {regno}
            </p>
            <p
              style={{
                padding: "5px",
              }}
            >
              Department: {dept}
            </p>
            <p
              style={{
                padding: "5px",
              }}
            >
              Year: {year}
            </p>
            <p
              style={{
                padding: "5px",
              }}
            >
              College: {college}
            </p>
            <p
              style={{
                padding: "5px",
              }}
            >
              Gender: {gender}
            </p>
            <p
              style={{
                padding: "5px",
              }}
            >
              email: {email}
            </p>
            <p
              style={{
                padding: "5px",
              }}
            >
              phone no: {phno}
            </p>
          </div>
          <div
            style={{
              width: "400px",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "20px",
              }}
              src={IdCard}
              alt="Id Card"
            />
          </div>
        </Stack>
      </Card>
      <div
        style={{
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          padding="30px 0"
          alignItems="center"
          justifyContent="space-between"
        >
          <h1>Departments Events</h1>
          <div>
            <UpdateForm
              DepartEvent={DepartEvent}
              EventsRegistered={EventsRegistered}
              PaperPresentation={PaperPresentation}
              ProjectPresentation={ProjectPresentation}
              CashToBePaid={CashToBePaid}
              id={id}
              AmountPaid={AmountPaid}
              cashPaid={cashPaid}
              cashPaidForPaper={cashPaidForPaper}
              cashPaidForProject={cashPaidForProject}
            />
          </div>
        </Stack>

        {DepartEvent &&
          deptnames.map((deptnm) => {
            return (
              !isEmpty(EventsRegistered[deptnm]) && (
                <Stack
                  direction="row"
                  sx={{
                    margin: "10px",
                    display: "flex",

                    alignItems: "center",
                  }}
                  spacing={1}
                >
                  <p>{deptnm}</p>

                  {!isEmpty(EventsRegistered[deptnm]) &&
                    EventsRegistered[deptnm].map((data) => {
                      return <Chip label={data} />;
                    })}
                </Stack>
              )
            );
          })}
      </div>
      {/* departments evnts */}

      {DepartEvent && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3>
            <strong>DEPARTMENTS EVENTS : 150 ₹</strong>
          </h3>

          <div>
            <Switch
              checked={cashPaid}
              onChange={(e) => handleChange(e, id, AmountPaid)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>

          <Chip
            sx={{
              color: cashPaid ? "black" : "white",
              background: cashPaid ? "lightgreen" : "red",
              width: "100px",
            }}
            label={cashPaid ? "paid" : "unpaid"}
          />
        </div>
      )}
      <div>
        <h1>Other Events</h1>

        {PaperPresentation && (
          <div
            style={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <h3>PAPER PRESENTATION : 200 ₹</h3>
            <div>
              <Switch
                checked={cashPaidForPaper}
                onChange={(e) => handleChangeforPaper(e, id, AmountPaid)}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
            <Chip
              sx={{
                color: cashPaidForPaper ? "black" : "white",
                background: cashPaidForPaper ? "lightgreen" : "red",
                width: "100px",
              }}
              label={cashPaidForPaper ? "paid" : "unpaid"}
            />
          </div>
        )}
        {ProjectPresentation && (
          <div
            style={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <h3>PROJECT PRESENTATION : 250 ₹</h3>
            <div>
              <Switch
                checked={cashPaidForProject}
                onChange={(e) => handleChangeforProject(e, id, AmountPaid)}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
            <Chip
              sx={{
                color: cashPaidForProject ? "black" : "white",
                background: cashPaidForProject ? "lightgreen" : "red",
                width: "100px",
              }}
              label={cashPaidForProject ? "paid" : "unpaid"}
            />
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Card
          sx={{
            padding: "10px",
          }}
        >
          <h2
            style={{
              marginRight: "20px",
            }}
          >
            Collected amount : {AmountPaid} ₹
          </h2>
        </Card>
        <Card
          sx={{
            padding: "10px",
          }}
        >
          <h2>Total Amount : {CashToBePaid} ₹</h2>
        </Card>
      </div>

      {load && (
        <Alert severity="error">updating the user don't refresh the page</Alert>
      )}
    </UserCard>
  );
}

export default UserInfoCard;
