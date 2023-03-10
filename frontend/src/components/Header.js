import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedIn, userInfo } = useSelector(state => state.user);
  const { cartItems } = useSelector(state => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header>
      <Navbar bg="light" className="p-2" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="logo">Love That Last</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/products" className="mx-3 fs-3">
              <Nav.Link>Necklaces</Nav.Link>
            </LinkContainer>
          </Nav>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {loggedIn ? (
                <NavDropdown
                  title={userInfo?.name}
                  id="adminmenu"
                  className="d-flex align-items-center"
                >
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
                <NavDropdown
                  title="Admin Dashboard"
                  id="adminmenu"
                  className="d-flex align-items-center"
                >
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
              <SearchBox />
              <LinkContainer to="/cart" className="mx-3 fs-3">
                <Nav.Link>
                  <i className="bi bi-cart"></i>
                  {cartItems?.length > 0 && (
                    <Badge pill bg="danger" className="position-absolute fs-6">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
