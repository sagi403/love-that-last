import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { resetStatus } from "../store/messageSlice";
import Meta from "../components/Meta";

const ThankYouContactScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(resetStatus());
  }, []);

  return (
    <Container className="my-5">
      <Meta title="Thank You" />
      <h1>Thank You For Signing Up</h1>
      <p className="fs-4">
        Thanks for subscribing to our newsletter! You'll be the first to know
        about our exclusive promotions, discounts, and special offers.
      </p>
      <p className="fs-4">
        Keep an eye out for our emails, and check out our website for more
        information on current deals and promotions.
      </p>
      <p className="fs-4">Thanks again and welcome to the community!</p>
    </Container>
  );
};

export default ThankYouContactScreen;
