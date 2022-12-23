import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Container,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getProductById } from "../store/productSlice";
import { resetError } from "../store/productSlice";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState("");

  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  // const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const {
    loadingProduct: loading,
    error,
    product,
  } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getProductById(params.id));

    return () => dispatch(resetError());
  }, []);

  return (
    <Container>
      <Link className="btn btn-light my-3" to={from}>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* <Meta title={product.name} /> */}
          <Row className="mb-4">
            <Col md={6}>
              <Image
                src={product.image}
                alt={product.name}
                className="image-size"
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  {/* <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  /> */}
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      // onClick={addToCartHandler}
                      className="w-100"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={10}>
              <h2>Description</h2>
              <ListGroup variant="flush" className="line-break">
                <ListGroup.Item>{product.longDescription}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    {/* <Rating value={review.rating} /> */}
                    <p>
                      {review.createdAt.split("T")[0]}{" "}
                      {review.createdAt.split("T")[1].split(".")[0]}
                    </p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {/* {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating" className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment" className="mb-3">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )} */}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductScreen;
