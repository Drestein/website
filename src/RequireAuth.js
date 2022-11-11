import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "./hooks/useAuthStatus";
import Loading from "./Loading";
const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Loading />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/Admin/login" />;
};
export default PrivateRoute;
