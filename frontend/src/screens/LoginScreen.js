import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Form, Button, Col, Row } from "react-bootstrap";
import { login, resetStatus } from "../store/userSlice";
import Message from "../components/Message";
import validateLogin from "../validation/loginValidation";
import FormItem from "../components/FormItem";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorsMessage, setErrorsMessage] = useState({
    email: null,
    password: null,
  });

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loggedIn } = useSelector(state => state.user);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (loggedIn) {
      navigate(from, { replace: true });
    }

    return () => dispatch(resetStatus());
  }, [loggedIn]);

  const submitHandler = async e => {
    e.preventDefault();
    dispatch(resetStatus());

    const errors = {};
    const { error } = validateLogin({ email, password });

    if (error) {
      for (let errorItem of error.details) {
        const { context, message } = errorItem;

        errors[context.key] = [message];
      }

      setErrorsMessage(errors);
      return;
    }

    setErrorsMessage({ email: null, password: null });
    dispatch(login({ email, password }));
  };

  return (
    <FormContainer>
      <h1>Login</h1>
      {error && <Message variant="danger">{error}</Message>}
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

        <FormItem
          controlId="password"
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          message={errorsMessage && errorsMessage.password}
        />

        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
