import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Meta from "../components/Meta";

const NotFoundScreen = () => {
  return (
    <Container className="py-4">
      <Meta title="Not Found" />
      <h1>404</h1>
      <h2>Oops! You weren't supposed to see this</h2>
      <p>
        The page you're looking for no longer exists.
        <br />
        Return to the {<NavLink to="/">home page</NavLink>} and remember: you
        haven't seen anything.
      </p>
      <p></p>
    </Container>
  );
};

export default NotFoundScreen;
