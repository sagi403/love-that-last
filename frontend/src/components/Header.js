import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="light" className="p-2" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>LTL</Navbar.Brand>
          </LinkContainer>
          <Navbar>
            <LinkContainer to="/login" className="mx-3 fs-3">
              <Nav.Link>
                <i className="bi bi-person"></i>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/search" className="mx-3 fs-3">
              <Nav.Link>
                <i class="bi bi-search"></i>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart" className="mx-3 fs-3">
              <Nav.Link>
                <i class="bi bi-cart"></i>
              </Nav.Link>
            </LinkContainer>
          </Navbar>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
