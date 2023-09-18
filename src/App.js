import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Form from "./components/Form/Form";
import Events from "./components/Events/Events";
import Main from "./Main";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { DisplayPopupProvider } from "./context/DisplayPopupContext";
import PrivateRoute from "./RequireAuth";
import SignIn from "./components/Admin/components/AdminSign";
import AdminMain from "./components/Admin/components/AdminMain";

import AdminPannel from "./components/Admin/components/ScanUsers";
import { UserProvider } from "./components/Admin/contexts/AdminContext";
import SingleUserPage from "./components/Admin/components/SingleUserPage";
import AdminProfile from "./components/Admin/components/AdminProfile";
import Lander from "./components/LandingPage/Lander";

import ConditionalValidationGrid from "./components/Admin/components/dataGrid/dataGrid";
import Pagenotfound from "./components/Pagenotfound/Pagenotfound";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);
  // console.log(window.Email)
  return (
    <>
      {loading ? (
        <Lander />
      ) : (
        <div>
          <DisplayPopupProvider>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="form" element={<Form />} />
              {/* <Route path="events" element={<Events />} /> */}
              <Route path="Admin/login" element={<UserProvider><SignIn /></UserProvider> } />
              <Route
                path="*"
                element={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <h1>Registion coming soon...</h1>
                   
                  </div>
                }
              />
              <Route
                path="user/:userid"
                element={
                  <UserProvider>
                    <SingleUserPage />
                  </UserProvider>
                }
              />
              <Route path="/Admin" element={<PrivateRoute />}>
                <Route path="/Admin" element={<AdminMain />}>
                  <Route path="users" element={<ConditionalValidationGrid />} />

                  <Route path="scanusers" element={<AdminPannel />} />
                  <Route path="profile" element={<AdminProfile />} />
                </Route>
              </Route>
            </Routes>
            <ToastContainer
              position="bottom-left"
              theme="white"
            ></ToastContainer>
          </DisplayPopupProvider>
        </div>
      )}
    </>
  );
}

export default App;
