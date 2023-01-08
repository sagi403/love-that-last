import { Form, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [showInput, setShowInput] = useState(false);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products?keyword=${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex align-items-center">
      <InputGroup>
        {showInput ? (
          <Form.Control
            type="text"
            placeholder="Search..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
        ) : (
          <Button className="btn btn-light" onClick={() => setShowInput(true)}>
            <i className="bi bi-search fs-4"></i>
          </Button>
        )}
        {showInput && (
          <Button
            className="btn btn-light"
            onClick={() => {
              setShowInput(false);
              setKeyword("");
            }}
          >
            <i className="bi bi-x-lg fs-4"></i>
          </Button>
        )}
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
