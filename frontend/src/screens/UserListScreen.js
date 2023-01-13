import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { deleteUser, resetStatus, usersList } from "../store/userSlice";
import Paginate from "../components/Paginate";
import Meta from "../components/Meta";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    users,
    page,
    pages,
    loadingUsers,
    error,
    errorDeleting,
    successDeletingUser,
  } = useSelector(state => state.user);

  const currentPage = +new URLSearchParams(location.search).get("pageNumber");

  useEffect(() => {
    dispatch(usersList(currentPage));
  }, [successDeletingUser, currentPage]);

  useEffect(() => {
    return () => dispatch(resetStatus());
  }, []);

  const deleteHandler = id => {
    dispatch(resetStatus());

    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Container>
      <Meta title="Users List" />
      <h1>Users</h1>
      {errorDeleting && <Message variant="danger">{errorDeleting}</Message>}

      {loadingUsers ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {successDeletingUser && (
            <Message variant="success">{successDeletingUser}</Message>
          )}
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
              {users?.map(user => (
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
          <Paginate page={page} pages={pages} />
        </>
      )}
    </Container>
  );
};

export default UserListScreen;
