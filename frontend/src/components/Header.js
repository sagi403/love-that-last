import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../store/userSlice";
import { useLocation } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { loggedIn, userInfo } = useSelector(state => state.user);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="light" className="p-2" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>LTL</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/products" className="mx-3 fs-3">
              <Nav.Link>Necklaces</Nav.Link>
            </LinkContainer>
          </Nav>
          <Navbar>
            {loggedIn ? (
              <NavDropdown title={userInfo?.name} id="adminmenu">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login" className="mx-3 fs-3">
                <Nav.Link>
                  <i className="bi bi-person"></i>
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin Dashboard" id="adminmenu">
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
            <LinkContainer to="/search" className="mx-3 fs-3">
              <Nav.Link>
                <i className="bi bi-search"></i>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer
              to="/cart"
              state={{ from: location }}
              className="mx-3 fs-3"
            >
              <Nav.Link>
                <i className="bi bi-cart"></i>
              </Nav.Link>
            </LinkContainer>
          </Navbar>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
