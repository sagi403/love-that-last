import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { deliverOrder, getOrderDetails, payOrder } from "../store/orderSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import PaypalCheckoutButton from "../components/PaypalCheckoutButton";

const OrderScreen = () => {
  const [paypalError, setPaypalError] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const { order, loading, errorOrder } = useSelector(state => state.order);
  const { userInfo } = useSelector(state => state.user);

  const [{ isPending }, dispatchPaypal] = usePayPalScriptReducer();

  const from =
    location.state?.from?.pathname && location.state?.from?.search
      ? `${location.state.from.pathname}${location.state.from.search}`
      : location.state?.from?.pathname
      ? location.state?.from?.pathname
      : "/";

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, []);

  useEffect(() => {
    if (!order?.isPaid) {
      dispatchPaypal({
        type: "setLoadingStatus",
        value: "pending",
      });
    } else if (order?.isPaid) {
      dispatchPaypal({
        type: "setLoadingStatus",
        value: "initial",
      });
    }
  }, [order]);

  const successPaymentHandler = paymentDetails => {
    dispatch(payOrder({ orderId: order.id, paymentDetails }));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order.id));
  };

  return loading ? (
    <Loader />
  ) : errorOrder ? (
    <Message variant="danger">{errorOrder}</Message>
  ) : (
    <Container>
      {from !== "/placeorder" && (
        <Link to={from} className="btn btn-light my-3">
          Go Back
        </Link>
      )}

      <h1>Order {order.id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt.split("T")[0]}{" "}
                  {order.deliveredAt.split("T")[1].split(".")[0]}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {order.paidAt.split("T")[0]}{" "}
                  {order.paidAt.split("T")[1].split(".")[0]}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order?.orderItems.map(item => (
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {isPending && <Loader />}
                {paypalError && (
                  <Message variant="danger">{paypalError}</Message>
                )}
                <PaypalCheckoutButton
                  price={order.totalPrice}
                  error={err => setPaypalError(err)}
                  success={order => successPaymentHandler(order)}
                />
              </ListGroup.Item>
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn w-100"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderScreen;
