import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useEffect } from "react";
import { getAllOrders, resetStatus } from "../store/orderSlice";
import { useLocation } from "react-router-dom";
import Paginate from "../components/Paginate";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { ordersAll, page, pages, loadingOrders, errorOrders } = useSelector(
    state => state.order
  );

  const currentPage = +new URLSearchParams(location.search).get("pageNumber");

  useEffect(() => {
    dispatch(getAllOrders(currentPage));

    return () => dispatch(resetStatus());
  }, [currentPage]);

  return (
    <Container>
      <h1>Orders</h1>
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant="danger">{errorOrders}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ordersAll?.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="bi bi-x-lg" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="bi bi-x-lg" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer
                      to={`/order/${order.id}`}
                      state={{ from: location }}
                    >
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} />
        </>
      )}
    </Container>
  );
};

export default OrderListScreen;
