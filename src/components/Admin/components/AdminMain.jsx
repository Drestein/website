import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import ResponsiveAppBar from "./AdminNav";
import { useState } from "react";
import AdminPannel from "./ScanUsers";
import { Outlet } from "react-router";
import styled from "styled-components";

const Admin = styled.div`
  background-color: #ffffff;
  height: 100vh;
  width: 100vw;
`;
function AdminMain() {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/Admin/scanusers");
  }, []);
  return (
    <Admin>
      <ResponsiveAppBar />
      <Outlet />
    </Admin>
  );
}

export default AdminMain;
