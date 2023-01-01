import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useEffect } from "react";
import { usersList } from "../store/userSlice";

const UserListScreen = () => {
  const dispatch = useDispatch();

  const { users, loadingUsers, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(usersList());
  }, []);

  const deleteHandler = id => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log(id);
    }
  };

  return (
    <Container>
      <h1>Users</h1>
      {loadingUsers ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i
                      className="bi bi-check-lg"
                      style={{ color: "green" }}
                    ></i>
                  ) : (
                    <i className="bi bi-x-lg" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user.id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="bi bi-pencil fs-5"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user.id)}
                  >
                    <i className="bi bi-trash fs-5"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserListScreen;
