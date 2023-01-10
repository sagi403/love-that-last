import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireMessageAuth = () => {
  const { contactUsMessage } = useSelector(state => state.message);

  return contactUsMessage ? <Outlet /> : <Navigate to="/notfound" />;
};

export default RequireMessageAuth;
