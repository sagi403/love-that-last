import { Form, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";

const SearchBox = () => {
  const [showInput, setShowInput] = useState(false);

  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <Form className="d-flex align-items-center">
      <InputGroup>
        {showInput ? (
          <Form.Control type="text" placeholder="Search..." />
        ) : (
          <Button className="btn btn-light" onClick={() => setShowInput(true)}>
            <i className="bi bi-search fs-4"></i>
          </Button>
        )}
        {showInput && (
          <Button className="btn btn-light" onClick={() => setShowInput(false)}>
            <i className="bi bi-x-lg fs-4"></i>
          </Button>
        )}
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
