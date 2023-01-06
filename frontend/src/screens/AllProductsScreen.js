import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../store/productSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Col, Container, Row } from "react-bootstrap";
import Product from "../components/Product";
import { resetStatus } from "../store/productSlice";
import Paginate from "../components/Paginate";
import { useLocation } from "react-router-dom";

const AllProductsScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    loadingProducts: loading,
    error,
    products,
    page,
    pages,
  } = useSelector(state => state.product);

  const currentPage = +new URLSearchParams(location.search).get("pageNumber");

  useEffect(() => {
    dispatch(getAllProducts(currentPage));

    return () => dispatch(resetStatus());
  }, [currentPage]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products?.map(product => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} />
        </>
      )}
    </Container>
  );
};

export default AllProductsScreen;
