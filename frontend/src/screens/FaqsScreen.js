import { Container } from "react-bootstrap";
import AccordionItem from "../components/AccordionItem";
import { generalInformation, returns, shippingAndTracking } from "../data/faqs";
import Meta from "../components/Meta";
import { faqsMeta } from "../data/metadata";

const FaqsScreen = () => {
  return (
    <Container className="my-5">
      <Meta title={faqsMeta.title} description={faqsMeta.description} />
      <h1>FAQs</h1>
      <h2 className="my-5">General Information</h2>
      {generalInformation &&
        generalInformation.map((q, idx) => (
          <AccordionItem key={idx} header={q.header} body={q.body} />
        ))}
      <h2 className="my-5">Shipping & Tracking</h2>
      {shippingAndTracking &&
        shippingAndTracking.map((q, idx) => (
          <AccordionItem key={idx} header={q.header} body={q.body} />
        ))}
      <h2 className="my-5">Returns, Refunds & Cancelation</h2>
      {returns &&
        returns.map((q, idx) => (
          <AccordionItem key={idx} header={q.header} body={q.body} />
        ))}
    </Container>
  );
};

export default FaqsScreen;
