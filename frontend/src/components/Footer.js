import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <hr className="footer-hr" />
      <Container className="py-5">
        <Row>
          <Col sm={12} md={2} className="pb-5">
            <Link to="/" className="text-decoration-none">
              <div className="py-2">Home</div>
            </Link>
            <Link to="/shipping-policy" className="text-decoration-none">
              <div className="py-2">Shipping Policy</div>
            </Link>
            <Link to="/refund-policy" className="text-decoration-none">
              <div className="py-2">Refund Policy</div>
            </Link>
            <Link to="/cart" className="text-decoration-none">
              <div className="py-2">Cart</div>
            </Link>
            <Link to="/faqs" className="text-decoration-none">
              <div className="py-2">FAQs</div>
            </Link>
            <Link to="/terms-of-service" className="text-decoration-none">
              <div className="py-2">Terms of Service</div>
            </Link>
            <Link to="/login" className="text-decoration-none">
              <div className="py-2">Account Login</div>
            </Link>
          </Col>
          <Col sm={12} md={2} className="pb-5">
            <Link to="/about-us" className="text-decoration-none">
              <div className="py-2">About Us</div>
            </Link>
            <Link to="/contact-us" className="text-decoration-none">
              <div className="py-2">Contact Us</div>
            </Link>
            <Link to="/privacy-policy" className="text-decoration-none">
              <div className="py-2">Privacy Policy</div>
            </Link>
          </Col>
          <Col sm={12} md={4} className="pb-5">
            <h5 className="pb-3">THE TEAM BEHIND THE SCENES</h5>
            <p>Here at LTL, we are obsessed with two things.</p>
            <p>Firstly, we are obsessed with love.</p>
            <p>
              Secondly, we are obsessed with unique, personal products that add
              a bit of joy to your life.
            </p>
            <p>
              Add joy to your loved one's day by picking a perfect gift for
              them.
            </p>
          </Col>
          <Col sm={12} md={4} className="pb-5">
            <h5 className="pb-3">SIGN UP AND SAVE</h5>
            <p>
              Promotions, discounts & more! Sign up now so that you don't miss
              out on any of our special offers:
            </p>
            <div className="position-relative w-75">
              <input
                type="text"
                className="footer-input"
                placeholder="Enter your email"
              />
              <i className="bi bi-envelope envelope-icon"></i>
            </div>
          </Col>
        </Row>
        <p className="text-center m-auto">
          &copy; {new Date().getFullYear()} LTL Copyright
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
