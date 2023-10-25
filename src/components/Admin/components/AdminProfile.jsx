import React, { useContext } from "react";
import { getAuth } from "firebase/auth";
import styled from "styled-components";
import { UserContext } from "../contexts/AdminContext";
const AdminProfleMain = styled.div`
  color: black;
`;
function AdminProfile() {

  const {auth} = useContext(UserContext)
  console.log(auth);

  return (
    <AdminProfleMain>
      <h1> Admin User : {auth.currentUser.email}</h1>
    </AdminProfleMain>
  );
}

export default AdminProfile;