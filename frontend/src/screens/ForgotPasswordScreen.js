import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Meta from "../components/Meta";
import FormItem from "../components/FormItem";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [errorsMessage, setErrorsMessage] = useState({ email: null });

  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <Container>
      <Meta title="Forgot Password" />
      <Button className="btn btn-light my-3" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <FormContainer>
        <h1>Trouble logging in?</h1>
        {/* {error && <Message variant="danger">{error}</Message>} */}
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
