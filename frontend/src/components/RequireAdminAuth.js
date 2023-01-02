import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAdminAuth = () => {
  const { userInfo } = useSelector(state => state.user);

  return userInfo.isAdmin ? <Outlet /> : <Navigate to="/notfound" />;
};

export default RequireAdminAuth;
