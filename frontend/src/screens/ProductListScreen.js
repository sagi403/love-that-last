import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useEffect } from "react";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  resetStatus,
} from "../store/productSlice";
import Paginate from "../components/Paginate";
import { useLocation } from "react-router-dom";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    loadingProducts,
    products,
    page,
    pages,
    error,
    successCreateProduct,
    successDeleteProduct,
    productId,
  } = useSelector(state => state.product);

  const currentPage = +new URLSearchParams(location.search).get("pageNumber");

  useEffect(() => {
    if (successCreateProduct) {
      navigate(`/admin/product/${productId}/edit`);
    }

    dispatch(getAllProducts(currentPage));
  }, [successCreateProduct, successDeleteProduct, currentPage]);

  useEffect(() => {
    return () => dispatch(resetStatus());
  }, []);

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const deleteHandler = id => {
    dispatch(resetStatus());

    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <Container>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {error && <Message variant="danger">{error}</Message>}
      {loadingProducts ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {successDeleteProduct && (
            <Message variant="success">{successDeleteProduct}</Message>
          )}
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products?.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product.id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="bi bi-pencil fs-5"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product.id)}
                    >
                      <i className="bi bi-trash fs-5"></i>
                    </Button>
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

export default ProductListScreen;
