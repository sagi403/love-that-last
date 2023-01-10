import { Container } from "react-bootstrap";
import Meta from "../components/Meta";
import { refundPolicyMeta } from "../data/metadata";

const RefundPolicyScreen = () => {
  return (
    <Container className="my-5">
      <Meta
        title={refundPolicyMeta.title}
        description={refundPolicyMeta.description}
      />
      <h1>Refund Policy</h1>
      <p>
        Any claims for misprinted/damaged/defective items must be submitted
        within 4 weeks after the product has been received. For packages lost in
        transit, all claims must be submitted no later than 4 weeks after the
        estimated delivery date. Claims deemed an error on our part are covered
        at our expense.
      </p>
      <h4 className="mt-5">What if the product is damaged in the mail?</h4>
      <p>
        If something arrives damaged, send a photo of the damaged goods to{" "}
        <a href="mailto:support@ltl.com">support@ltl.com</a>, then we'll gladly
        send a replacement at no cost to you.
      </p>
      <h4 className="mt-5">What if I received the wrong item?</h4>
      <p>
        We offer replacement to customers that receive the wrong items. Please
        contact us at <a href="mailto:support@ltl.com">support@ltl.com</a> with
        photos of the wrong items and we’ll sort that out for you.
      </p>
      <h4 className="mt-5">What if I entered the wrong address?</h4>
      <p>
        If you provide an address that is considered insufficient by the
        courier, the shipment will be returned to our facility. You will be
        liable for reshipment costs once we have confirmed an updated address
        with you.
      </p>
      <h4 className="mt-5">What if the order is lost in the mail?</h4>
      <p>
        For packages lost in transit, all claims must be submitted no later than
        4 weeks after the estimated delivery date. But no worries! We'll cover
        the costs of reprinting and shipping a replacement order for you.
      </p>
      <p>
        We may ask for your help before doing that, like confirming that the
        shipping address was correct. It would also be good to double check with
        your local post office and try locating the lost order.
      </p>
      <p>
        Keep in mind that if tracking information states an order was delivered,
        we won't take responsibility and reship that order. In that case, any
        replacements would have to be at your expense.
      </p>
      <h4 className="mt-5">Late or missing refunds (if applicable)</h4>
      <p>
        If you haven’t received a refund yet, first check your bank account
        again. Then contact your credit card company, it may take some time
        before your refund is officially posted. Next contact your bank. There
        is often some processing time before a refund is posted. If you’ve done
        all of this and you still have not received your refund yet, please
        contact us at <a href="mailto:support@ltl.com">support@ltl.com</a>.
      </p>
      <h4 className="mt-5">Can I exchange an item?</h4>
      <p>At this time, we don't offer exchanges.</p>
      <p>
        Though rare, it's possible that an item you ordered was mislabelled. If
        that’s the case, please let us know at{" "}
        <a href="mailto:support@ltl.com">support@ltl.com</a> within 4 weeks
        after receiving your order. Include your order number and photos of the
        mislabeled item, and we’ll send you a new one, or issue a refund!
      </p>
      <h4 className="mt-5">What if I want to cancel my order?</h4>
      <p>
        You can cancel your order within 24 hours of your purchase, any changes
        or cancel requests will be denied after 24 hours because the order is in
        production.
      </p>
      <p>
        Please contact us at{" "}
        <a href="mailto:support@ltl.com">support@ltl.com</a> as soon as you want
        to make any changes to your order and we’ll sort that out for you.
      </p>
      <h4 className="mt-5">Return for refund</h4>
      <p>
        All the products at our store can be returned within 30 days of receipt
        of shipment, except items that on sale.
      </p>
      <p>Pre-paid return shipping label provided:</p>
      <ul>
        <li>
          If the return was due to an error of ours (for example, the item you
          received is defective or wrong), we will accept responsibility for all
          shipping costs related to the return.
        </li>
        <li>
          If the return is not due to an error of ours (for example, you ordered
          it and then decided later on that you don't want it), the buyer
          accepts full responsibility for all shipping costs. (Shipping label
          fee deducted from the refund)
        </li>
      </ul>
      <p>
        A $5 Restocking fee is deducted from the total amount available for
        refund. (The restocking fee applies to the entire return, not each
        individual item)
      </p>
      <p>Returnable conditions:</p>
      <ul>
        <li>
          For hygienic reasons all items must be returned unused, undamaged and
          brand new or we will not accept it back.
        </li>
        <li>Shipping fees will not be reimbursed if the return is denied.</li>
      </ul>
      <p>
        Any items sent to us without our approval first, will not be accepted
        and will be donated to charity.
      </p>
      <p>
        If you want to return an item please let us know by contacting us at{" "}
        <a href="mailto:support@ltl.com">support@ltl.com</a>!
      </p>
    </Container>
  );
};

export default RefundPolicyScreen;
