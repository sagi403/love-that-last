import { Button, Col, Container, Row } from "react-bootstrap";
import products from "../data/products";
import Product from "../components/Product";

const HomeScreen = () => {
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
            Here At Diamond Den, Our Customers Are Our #1 Priority
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
          <Col className="text-center">
            <img
              className="img-fluid"
              src=".\images\homepage\love-knot-message-card-red-roses.jpg"
              alt="new arrival"
            />
          </Col>
          <Col className="d-flex align-items-center">
            <div>
              <h6>NEW DESIGN</h6>
              <h2>New Arrival</h2>
              <h5>We are adding new unique design every week</h5>
              <Button className="mt-3">SHOP NOW</Button>
            </div>
          </Col>
        </Row>
        <div className="text-center py-5">
          <h2>Find Something Special</h2>
          <Button variant="outline-dark" className="my-3">
            VIEW ALL
          </Button>
          <Row className="py-4">
            {products.map(product => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default HomeScreen;
