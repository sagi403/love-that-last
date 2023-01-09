import { Accordion } from "react-bootstrap";

const AccordionItem = ({ header, body }) => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{header}</Accordion.Header>
        <Accordion.Body className="line-break">{body}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default AccordionItem;
