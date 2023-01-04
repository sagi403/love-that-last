import { Form } from "react-bootstrap";

const FormItem = ({
  controlId,
  label,
  type,
  placeholder,
  value,
  onChange,
  message,
}) => {
  return (
    <Form.Group controlId={controlId} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type === "textarea" ? undefined : type}
        as={type === "textarea" ? type : undefined}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isInvalid={message}
      ></Form.Control>
      {message &&
        message.map((msg, idx) => (
          <Form.Control.Feedback type="invalid" key={idx}>
            {msg}
          </Form.Control.Feedback>
        ))}
    </Form.Group>
  );
};

export default FormItem;
