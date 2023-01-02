import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Container, Form } from "react-bootstrap";

const UserEditScreen = () => {
  const { userInfo } = useSelector(state => state.user);

  const [name, setName] = useState(userInfo.name || "");
  const [email, setEmail] = useState(userInfo.email || "");
  const [isAdmin, setIsAdmin] = useState(userInfo.isAdmin || false);

  const { id } = useParams;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <Container>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {/* {errorUpdate && <Message variant="danger">{errorUpdate}</Message>} */}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="isAdmin" className="mb-3">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={e => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default UserEditScreen;
