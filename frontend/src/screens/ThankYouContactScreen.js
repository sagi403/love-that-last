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
      <h1>Thank You For Reaching Out</h1>
      <p className="fs-4">
        We appreciate you taking the time to contact us. Your message has been
        received, and we'll get back to you as soon as possible.
      </p>
      <p className="fs-4">
        In the meantime, please check out our FAQ for more information about our
        products and services.
      </p>
    </Container>
  );
};

export default ThankYouContactScreen;
