import { useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { getProductById } from "../store/productSlice";
import Meta from "../components/Meta";

const CartScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { product } = useSelector(state => state.product);
  const { cartItems } = useSelector(state => state.cart);

  const from = location.state?.from?.pathname || "/";

  const qty = location.search
    ? Number(new URLSearchParams(location.search).get("qty"))
    : 1;

  useEffect(() => {
    if (!product && id) {
      dispatch(getProductById(id));
    }

    if (id && product) {
      const { name, image, price, id: productId, countInStock } = product;

      dispatch(
        addToCart({ name, qty, image, price, product: productId, countInStock })
      );
    }
  }, [id]);

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <Container>
      <Meta title="Cart" />
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to={from}>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems?.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`/product/${item.product}`}
                        state={{ from: location }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={e => {
                          const itemQty = Number(e.target.value);
                          dispatch(addToCart({ ...item, qty: itemQty }));
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => dispatch(removeFromCart(item.product))}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartScreen;
