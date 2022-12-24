import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsStored = JSON.parse(sessionStorage.getItem("products"));

    if (productsStored) {
      setProducts(productsStored);
    } else {
      (async () => {
        const { data } = await axios.get("/api/products/top4");
        setProducts(data);

        sessionStorage.setItem("products", JSON.stringify(data));
      })();
    }
  }, []);

  return (
    <>
      <img
        className="img-fluid"
        src=".\images\homepage\Necklace-Slide.jpg"
        alt="Necklace-Slide"
      />
      <Container className="py-5">
        <div className="text-center py-5">
          <h1 className="mx-auto">
            Here At LTL, Our Customers Are Our #1 Priority
          </h1>
          <p className="mx-auto">
            Yes: We love our customers more than anything! And that's saying
            something.
            <br /> In addition to keeping prices as low as possible, while
            sourcing a huge selection of unique product gifts,
            <br /> we also aim to provide fantastic customer service.
            <br /> We process orders within 24 hours so that you start leveling
            up your life faster. Got a question? We are happy to help.
            <br /> You can email us or you can message us on Facebook live chat
            and one of our team members will get back to you ASAP!
          </p>
        </div>
        <Row className="py-5">
          <Col sm={12} md={6} className="text-center">
            <img
              className="img-fluid"
              src=".\images\homepage\love-knot-message-card-red-roses.jpg"
              alt="new arrival"
            />
          </Col>
          <Col sm={12} md={6} className="d-flex align-items-center">
            <div className="py-5">
              <h6>NEW DESIGN</h6>
              <h2>New Arrival</h2>
              <h5>We are adding new unique design every week</h5>
              <Button className="mt-3">SHOP NOW</Button>
            </div>
          </Col>
        </Row>
        <div className="text-center py-5">
          <h2>Find Something Special</h2>
          <Link to="/products">
            <Button variant="outline-dark" className="my-3 py-1">
              VIEW ALL
            </Button>
          </Link>
          <Row className="py-4">
            {products.map(product => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
      <div className="newsletter-container">
        <h3 className="text-light pb-2">
          Promotions, discounts & more! Sign up now so that you don't miss out:
        </h3>
        <div className="d-flex justify-content-center">
          <input
            className="newsletter-input"
            type="text"
            placeholder="Enter your email"
          />
          <Button variant="dark">SUBSCRIBE</Button>
        </div>
      </div>
      <Container className="py-5">
        <div className="py-5 text-center">
          <h2>WHY LTL?</h2>
          <Row className="py-4">
            <Col sm={12} md={4}>
              <div>
                <img
                  className="img-fluid py-3"
                  src=".\images\favicon\Secure-Shopping.png"
                  alt="new arrival"
                />
                <h4>Secure Shopping</h4>
                <p className="d-inline">
                  When it comes to security, LTL uses best in class technology
                  so you can rest easy. Your personal details are never shared,
                  sold or rented to anyone.
                </p>
              </div>
            </Col>
            <Col sm={12} md={4}>
              <img
                className="img-fluid py-3"
                src=".\images\favicon\Free-shipping.png"
                alt="new arrival"
              />
              <h4>Fast Shipping</h4>
              <p className="d-inline">
                With fast shipping, your order will be delivered 2-5 business
                days after all your items are available to ship.
              </p>
            </Col>
            <Col sm={12} md={4}>
              <img
                className="img-fluid py-3"
                src=".\images\favicon\Unique-Everything.png"
                alt="new arrival"
              />
              <h4>Unique Everything</h4>
              <p className="d-inline">
                Here at LTL, All of our items are designed, personalized and
                fulfilled with love.
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default HomeScreen;
