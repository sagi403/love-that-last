import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Form, Button, Col, Row } from "react-bootstrap";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <FormContainer>
      <h1>Login</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
