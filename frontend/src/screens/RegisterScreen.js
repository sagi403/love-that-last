import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Form, Button, Col, Row } from "react-bootstrap";
import FormItem from "../components/FormItem";
import { useDispatch, useSelector } from "react-redux";
import { register, resetStatus } from "../store/userSlice";
import validateRegister from "../validation/registerValidation";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { registerMeta } from "../data/metadata";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorsMessage, setErrorsMessage] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
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

  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetStatus());

    const errors = validateRegister({
      name,
      email,
      password,
      confirmPassword,
    });

    if (Object.keys(errors).length !== 0) {
      setErrorsMessage(errors);
      return;
    }

    setErrorsMessage({
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
    });
    dispatch(register({ name, email, password }));
  };

  return (
    <FormContainer>
      <Meta title={registerMeta.title} description={registerMeta.description} />
      <h1>Register</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
        <FormItem
          controlId="name"
          label="Name"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={e => setName(e.target.value)}
          message={errorsMessage && errorsMessage.name}
        />
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
        <FormItem
          controlId="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          message={errorsMessage && errorsMessage.confirmPassword}
        />
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
