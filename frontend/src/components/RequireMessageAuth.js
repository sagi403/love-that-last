import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireMessageAuth = () => {
  const { messageSent } = useSelector(state => state.message);

  return messageSent ? <Outlet /> : <Navigate to="/notfound" />;
};

export default RequireMessageAuth;
