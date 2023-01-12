import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { authResetPassword } from "../store/userSlice";

const ResetPasswordAuth = () => {
  const { id, token } = useParams();
  const dispatch = useDispatch();

  const { loadingAuthResetPassword, successAuthResetPassword } = useSelector(
    state => state.user
  );

  useEffect(() => {
    if (!successAuthResetPassword) {
      dispatch(authResetPassword({ id, token }));
    }
  }, []);

  if (loadingAuthResetPassword) {
    return;
  }

  return successAuthResetPassword ? <Outlet /> : <Navigate to="/notfound" />;
};

export default ResetPasswordAuth;
