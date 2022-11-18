import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../../../configs/Firebase.config";
import { onSnapshot } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { toast } from "react-toastify";
import styled from "styled-components";
import { uuidv4 } from "@firebase/util";
import { css } from "@mui/material";
import { Chip } from "@mui/material";
import { Stack } from "@mui/system";
import Loading from "../../../Loading";
import { useContext } from "react";
import { UserContext } from "../contexts/AdminContext";
import supabase from "../../../client";
const SingleUserMain = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UserCard = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  border-radius: 10px;
  background: ${(props) =>
    props.paid && props.PaperPaid && props.ProjectPaid
      ? "#bbffca;"
      : "#fdaeae"};
`;

function SingleUserPage() {
  // const { RegUsers, DataLoad} = useContext(UserContext);

  const params = useParams();
  const userid = params.userid;
  const [Registeredpeople, setRegistredPeople] = useState([]);
  const [load, setLoad] = useState(true);
  //    http://localhost:3000/user/qlkwnfdklwqfn



  useEffect(() => {

    async function innerfetch() {

      const {data,error} = await  supabase
      .from('RegisteredPeople')
      .select()
      .eq('userRef',userid)
      .single()
      if(error){
        toast.error(error)
        console.log(error)
        setLoad(false)

      }
      if(data){
        console.log(data)
        setRegistredPeople([data])
        setLoad(false)

      }
    }


    // try {
    //   setLoad(true);
    //   const docRef = doc(db, "RegisteredPeople", `${userid}`);
    //   onSnapshot(docRef, (snapshot) => {
    //     let books = [];
    //     // books.push(snapshot.data())

    //     books.push(snapshot.data());
    //     if (books[0] != undefined) {
    //       setRegistredPeople(books);
    //     }
    //     setLoad(false);
    //   });
    // } catch (e) {
    //   toast.error("your not exist");
    //   console.log(e);
    // }
    innerfetch()
  }, []);

  if (load) {
    return <Loading />;
  }

  return (
    <SingleUserMain>
      {Registeredpeople.length === 0 ? (
        <h1>user Not Found</h1>
      ) : (
        <div>
          {Registeredpeople.map((data) => {
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
              PaperPresentation,
              ProjectPresentation,
              DepartEvent,
              cashPaidForProject,
              cashPaidForPaper,
            } = data;
            return (
              <UserCard
                paid={DepartEvent ? cashPaid : true}
                PaperPaid={PaperPresentation ? cashPaidForPaper : true}
                ProjectPaid={ProjectPresentation ? cashPaidForProject : true}
                key={uuidv4()}
              >
                <p>name : {fname + " " + lname}</p>
                <p>college : {college}</p>
                <p>department : {dept}</p>
                <p>gender : {gender}</p>
                <p>year : {year}</p>
                <p>regno : {regno}</p>
                <div
                  style={{
                    height: "100%",
                  }}
                >
                  {DepartEvent && (
                    <Stack
                      padding="10px 0px"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>Department Event :</p>
                      <Chip
                        sx={{
                          color: cashPaid ? "black" : "white",
                          background: cashPaid ? "lightgreen" : "red",
                          width: "100px",
                        }}
                        label={cashPaid ? "paid" : "unpaid"}
                      />
                    </Stack>
                  )}

                  {PaperPresentation && (
                    <Stack
                      padding="10px 0px"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>Paper Presentation : </p>
                      <Chip
                        sx={{
                          color: cashPaidForPaper ? "black" : "white",
                          background: cashPaidForPaper ? "lightgreen" : "red",
                          width: "100px",
                        }}
                        label={cashPaidForPaper ? "paid" : "unpaid"}
                      />
                    </Stack>
                  )}
                  {ProjectPresentation && (
                    <Stack
                      padding="10px 0px"
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <p>Project presentation : </p>
                      <Chip
                        sx={{
                          color: cashPaidForProject ? "black" : "white",
                          background: cashPaidForProject ? "lightgreen" : "red",
                          width: "100px",
                        }}
                        label={cashPaidForProject ? "paid" : "unpaid"}
                      />
                    </Stack>
                  )}
                </div>
              </UserCard>
            );
          })}
        </div>
      )}
    </SingleUserMain>
  );
}

export default SingleUserPage;
