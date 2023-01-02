import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import FormItem from "../components/FormItem";
import {
  getUserDetails,
  resetStatus,
  updateUserDetails,
} from "../store/userSlice";
import validateUserUpdate from "../validation/userUpdateValidation";

const UserEditScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorsMessage, setErrorsMessage] = useState({
    name: null,
    email: null,
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userDetails, errorUpdateUser, successUpdateUser } = useSelector(
    state => state.user
  );

  useEffect(() => {
    dispatch(getUserDetails(id));

    return () => dispatch(resetStatus());
  }, []);

  useEffect(() => {
    if (successUpdateUser) {
      navigate("/admin/userlist");
    }
    if (userDetails) {
      setName(userDetails.name);
      setEmail(userDetails.email);
      setIsAdmin(userDetails.isAdmin);
    }
  }, [userDetails, successUpdateUser]);

  const submitHandler = e => {
    e.preventDefault();
    const errors = {};
    const { error } = validateUserUpdate({ name, email });

    if (error) {
      for (let errorItem of error.details) {
        const { context, message } = errorItem;

        errors[context.key] = [message];
      }

      setErrorsMessage(errors);
      return;
    }

    setErrorsMessage({ name: null, email: null });
    dispatch(updateUserDetails({ id, name, email, isAdmin }));
  };

  return (
    <Container>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {errorUpdateUser && (
          <Message variant="danger">{errorUpdateUser}</Message>
        )}
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
