import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import Message from "../components/Message";
import { createOrder, resetError } from "../store/orderSlice";

const PlaceOrderScreen = () => {
  const [itemsPrice, setItemsPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    state => state.cart
  );

  const { success, error } = useSelector(state => state.order);

  useEffect(() => {
    if (success) {
      console.log("ok");
    }

    return () => dispatch(resetError());
  }, [success]);

  useEffect(() => {
    if (shippingAddress.length === 0) {
      navigate("/shipping");
    }
    if (paymentMethod.length === 0) {
      navigate("/payment");
    }

    const cartItemsPrice = cartItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
    setItemsPrice(cartItemsPrice);

    const cartShippingPrice = (cartItemsPrice > 100 ? 0 : 10).toFixed(2);
    setShippingPrice(cartShippingPrice);

    const cartTaxPrice = (
      cartItemsPrice > 75 ? 0.15 * cartItemsPrice : 0
    ).toFixed(2);
    setTaxPrice(cartTaxPrice);

    const cartTotalPrice = (
      Number(cartItemsPrice) +
      Number(cartShippingPrice) +
      Number(cartTaxPrice)
    ).toFixed(2);
    setTotalPrice(cartTotalPrice);
  }, []);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: +itemsPrice,
        taxPrice: +taxPrice,
        shippingPrice: +shippingPrice,
        totalPrice: +totalPrice,
      })
    );
  };

  return (
    <Container className="py-5">
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item className="py-3">
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city}{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item className="py-3">
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item className="py-3">
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map(item => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                            state={{ from: location }}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          ${item.price} x {item.qty} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  disabled={cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderScreen;
