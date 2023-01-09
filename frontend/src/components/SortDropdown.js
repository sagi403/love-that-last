import { Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const SortDropdown = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const keyword = new URLSearchParams(location.search).get("keyword") || "";
  const sortOrder = new URLSearchParams(location.search).get("sortOrder") || "";

  const changeSortOrder = e => {
    const search = keyword
      ? `/products?keyword=${keyword}&sortOrder=${e.target.value}`
      : `/products?sortOrder=${e.target.value}`;

    navigate(search);
  };

  return (
    <Row className="justify-content-end">
      <Col md={2}>
        <Form>
          <Form.Control
            as="select"
            value={sortOrder}
            onChange={changeSortOrder}
          >
            <option value="" disabled>
              SORT
            </option>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="numReviews">Number of Reviews</option>
            <option value="price">Price</option>
            <option value="createdAt">Created Date</option>
          </Form.Control>
        </Form>
      </Col>
    </Row>
  );
};

export default SortDropdown;
