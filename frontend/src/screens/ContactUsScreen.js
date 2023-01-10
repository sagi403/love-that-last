import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import FormItem from "../components/FormItem";
import validateContact from "../validation/contactValidation";
import { messageReceive } from "../store/messageSlice";

const ContactUsScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorsMessage, setErrorsMessage] = useState({
    name: null,
    email: null,
    message: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();

    const errors = validateContact({ name, email, message });

    if (Object.keys(errors).length !== 0) {
      setErrorsMessage(errors);
      return;
    }

    setErrorsMessage({ name: null, email: null, message: null });
    dispatch(messageReceive());
    navigate("/thank-you", { replace: true });
  };

  return (
    <FormContainer>
      <h1 className="my-4">Contact Us</h1>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col>
            <FormItem
              controlId="name"
              label="Name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={e => setName(e.target.value)}
              message={errorsMessage && errorsMessage.name}
            />
          </Col>
          <Col>
            <FormItem
              controlId="email"
              label="Email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              message={errorsMessage && errorsMessage.email}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem
              controlId="message"
              label="Message"
              type="textarea"
              placeholder="Enter message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              message={errorsMessage && errorsMessage.message}
            />
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Button type="submit" variant="primary">
              SEND
            </Button>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default ContactUsScreen;
