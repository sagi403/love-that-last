import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { getUserOrders } from "../store/orderSlice";
import { resetStatus, updateProfile } from "../store/userSlice";
import FormItem from "../components/FormItem";
import validateProfileUpdate from "../validation/profileUpdateValidation";
import validatePasswordUpdate from "../validation/passwordUpdateValidation";
import { useLocation } from "react-router-dom";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";

const ProfileScreen = () => {
  const { userInfo, success, error, loadingUpdates } = useSelector(
    state => state.user
  );

  const [name, setName] = useState(userInfo.name || "");
  const [email, setEmail] = useState(userInfo.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userDetailsForm, setUserDetailsForm] = useState(true);
  const [errorsMessage, setErrorsMessage] = useState({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const dispatch = useDispatch();
  const location = useLocation();

  const { orders, page, pages, loadingOrders, errorOrders } = useSelector(
    state => state.order
  );

  const currentPage = +new URLSearchParams(location.search).get("pageNumber");

  useEffect(() => {
    dispatch(getUserOrders(currentPage));

    return () => dispatch(resetStatus());
  }, [currentPage]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetStatus());

    let updateData = null;
    userDetailsForm
      ? (updateData = { name, email })
      : (updateData = { password, confirmPassword });

    const errors = userDetailsForm
      ? validateProfileUpdate(updateData)
      : validatePasswordUpdate(updateData);

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
    dispatch(updateProfile(updateData));
  };

  const handleChangeForm = () => {
    setUserDetailsForm(!userDetailsForm);
    setErrorsMessage({
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
    });
    dispatch(resetStatus());
  };

  return (
    <Container>
      <Meta title="Profile" />
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loadingUpdates && <Loader />}
          <Form onSubmit={submitHandler}>
            {userDetailsForm ? (
              <div>
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
              </div>
            ) : (
              <div>
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
              </div>
            )}
            <div className="d-flex justify-content-around pb-3">
              <Button type="submit" variant="primary">
                Update
              </Button>
              <Button
                type="button"
                variant="outline-dark"
                onClick={handleChangeForm}
              >
                {userDetailsForm ? "Change Password" : "Change Profile"}
              </Button>
            </div>
          </Form>
        </Col>
        <Col md={9}>
          <h2>My orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="bi bi-x-lg"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className="bi bi-x-lg"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer
                          to={`/order/${order.id}`}
                          state={{ from: location }}
                        >
                          <Button className="btn-sm" variant="light">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Paginate page={page} pages={pages} />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
