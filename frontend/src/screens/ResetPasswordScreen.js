import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Meta from "../components/Meta";
import FormItem from "../components/FormItem";
import { resetPassword, resetStatus } from "../store/userSlice";
import validateResetPassword from "../validation/resetPasswordValidation";

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorsMessage, setErrorsMessage] = useState({
    password: null,
    confirmPassword: null,
  });

  const { successResetPassword: success, errorResetPassword: error } =
    useSelector(state => state.user);

  const { id, token } = useParams();
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetStatus());

    const errors = validateResetPassword({ password, confirmPassword });

    if (Object.keys(errors).length !== 0) {
      setErrorsMessage(errors);
      return;
    }

    setErrorsMessage({ password: null, confirmPassword: null });
    dispatch(resetPassword({ id, token, password }));
  };

  return (
    <Container>
      <Meta title="Forgot Password" />
      <FormContainer>
        <h1>Reset Password</h1>
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">{success}</Message>}
        <Form onSubmit={submitHandler}>
          <FormItem
            controlId="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            message={errorsMessage && errorsMessage.password}
          />
          <FormItem
            controlId="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            message={errorsMessage && errorsMessage.confirmPassword}
          />
          <Button type="submit" variant="primary" disabled={success}>
            Reset Password
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default ResetPasswordScreen;
