import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Meta from "../components/Meta";
import FormItem from "../components/FormItem";
import { forgotPassword, resetStatus } from "../store/userSlice";
import validateForgotPassword from "../validation/forgotPasswordValidation";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [errorsMessage, setErrorsMessage] = useState({ email: null });

  const { successForgotPasswordLink: success, errorForgotPassword: error } =
    useSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetStatus());

    const errors = validateForgotPassword({ email });

    if (Object.keys(errors).length !== 0) {
      setErrorsMessage(errors);
      return;
    }

    setErrorsMessage({ email: null });
    dispatch(forgotPassword(email));
  };

  return (
    <Container>
      <Meta title="Forgot Password" />
      <Button className="btn btn-light my-3" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <FormContainer>
        <h1>Trouble logging in?</h1>
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">{success}</Message>}
        <Form onSubmit={submitHandler}>
          <FormItem
            controlId="email"
            label="Email Address"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            message={errorsMessage && errorsMessage.email}
          />
          <Button type="submit" variant="primary">
            Send login link
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default ForgotPasswordScreen;
