import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  Query,
  where,
} from "firebase/firestore";
import { db } from "../../../configs/Firebase.config.js";
import { Card } from "@mui/material";
import { Switch } from "@mui/material";
import { Typography } from "@mui/material";
import styled from "styled-components";
import UserinfoCard from "../components/UserInfoCard";
import Loading from "../../../Loading.jsx";
const PaidUSerMain = styled.div`
  width: 100vw;
  padding: 0 1.5rem;
  margin: 0 auto;
  display: grid;
  margin-top: 50px;
  place-items: center;
  min-height: 100px;
  /* row-gap: 1rem; */
  gap: 1rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
function PaidUsers() {
  const [paidUsers, setPaidusers] = useState([]);
  const [load, setload] = useState(false);

  useEffect(() => {
    setload(true);
    const colref = collection(db, "RegisteredPeople");
    const q = query(colref, where("cashPaid", "==", true));

    onSnapshot(q, (snapshot) => {
      let books = [];
      console.log(snapshot.docs);
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      // console.log(books)
      console.log(books);
      setPaidusers(books);
      setload(false);
    });
  }, []);
  if (load) {
    return <Loading />;
  }

  if (paidUsers.length == 0) {
    return <h1>no user</h1>;
  }

  return (
    <PaidUSerMain>
      {paidUsers.map((data) => {
        return <UserinfoCard data={data} />;
      })}
    </PaidUSerMain>
  );
}

export default PaidUsers;
