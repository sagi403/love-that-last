import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/productSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Col, Container, Row } from "react-bootstrap";
import Product from "../components/Product";
import { resetError } from "../store/productSlice";

const AllProductsScreen = () => {
  const dispatch = useDispatch();

  const {
    loadingProducts: loading,
    error,
    products,
  } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getAllProducts());

    return () => dispatch(resetError());
  }, []);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map(product => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default AllProductsScreen;
