import { Container, Table } from "react-bootstrap";

const ShippingPolicyScreen = () => {
  return (
    <Container className="my-5">
      <h1>Shipping Policy</h1>
      <p>
        At LTL our goal is to offer you the best shipping options, no matter
        where you live in the world. Every day, we deliver to hundreds of
        customers, ensuring that we provide the very highest levels of
        responsiveness to you at all times.
      </p>
      <h2 className="mt-5">
        The time frame for order delivery is divided into two parts:
      </h2>
      <img
        className="img-fluid"
        src=".\images\homepage\Delivery-Time-Necklace.png"
        alt="new arrival"
      />
      <p>
        <u>Fulfillment time</u>: The time it takes to make your custom-ordered
        product. Most orders are shipped within:
      </p>
      <ul>
        <li>1-2 business days for all types of products.</li>
      </ul>
      <p>
        Fulfillment time doesn't include shipping. To get an idea of how long an
        order will take to reach its destination, combine the estimated
        fulfillment time with the estimated shipping time. Fulfillment for large
        orders may take longer than the 1-2 day average.
      </p>
      <p>
        <u>Shipping time</u>: This refers to the time it takes for items to be
        shipped from our facilities to the destination. Delivery usually takes
        about:
      </p>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Destination</th>
            <th>Estimated time frame once shipped</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>USA</td>
            <td>2-5 days</td>
          </tr>
          <tr>
            <td>Canada</td>
            <td>4-6 days</td>
          </tr>
          <tr>
            <td>UK, most of EU </td>
            <td>5-15 days</td>
          </tr>
          <tr>
            <td>Australia, New Zealand </td>
            <td>5-15 days</td>
          </tr>
          <tr>
            <td>Rest of the World </td>
            <td>5-20 days</td>
          </tr>
        </tbody>
      </Table>
      <p>
        Please understand these are estimates and are not a guarantee on exact
        times, so many factors can play a role in these times that it is hard to
        give an exact number of days for each item. We use these as guidelines
        only.
      </p>
      <ul>
        <li>
          During peak seasonal months, our fulfillment times may take longer
          than usual.
        </li>
        <li>
          Shipping to Puerto Rico, Hawaii and Alaska up to 5 – 9 business days.
        </li>
      </ul>
      <h2 className="mt-5">Other Info</h2>
      <p>
        For USA Domestic orders, we use USPS First Class with tracking. For
        International orders, we use UPS or USPS, both use the equivalent First
        Class International service. Once the package has landed in the
        destination country, it is delivered by the domestic mail carrier in
        that country.
      </p>
      <ul>
        <li>
          Tracking is available for all USA Domestic orders, and orders to
          around 36 international countries.
        </li>
        <li>
          Due to Covid-19, some countries are not accepting international mail.
        </li>
        <li>
          All international mail items will show no tracking updates once they
          have left the USA, until they have cleared customs in the destination
          country.
        </li>
        <li>
          While we make every effort to label our shipments to assist customers
          with the fastest delivery, if customs charges are applied on a
          shipment, this is payable by the customer.
        </li>
        <li>
          LTL does not cover items that are lost or stolen in transit if the
          package is marked as Delivered by the carrier.
        </li>
      </ul>
      <h2 className="mt-5">Shipping Cost</h2>
      <p>
        All orders above $100 have free shipping, for orders below that amount,
        we charge $10 for shipping.
      </p>
      <h2 className="mt-5">Peak Times</h2>
      <p>
        Year to year can be different. However, we use these times of year as
        our peak times. Keep in mind that shipping times also play a factor in
        the overall delivery times for orders.
      </p>
      <ul>
        <li>Valentines Day - February 14th</li>
        <li>St Patrick's Day - March 17th</li>
        <li>Easter - End of March</li>
        <li>Mother's Day - May around the 3rd weekend</li>
        <li>Father's Day - June around the 3rd weekend</li>
        <li>4th of July - July 4th</li>
        <li>Back to School -College Sports August thru middle of September</li>
        <li>Halloween - October 31st</li>
        <li>Thanksgiving - November 25th</li>
        <li>Christmas/New Years December 25th & January 1st</li>
      </ul>
      <h2 className="mt-5">Shipment Confirmation & Order Tracking</h2>
      <p>
        You will receive a Shipment Confirmation email once your order has
        shipped containing your tracking number(s). The tracking number will be
        active within 24 hours.
      </p>
      <h2 className="mt-5">Customs, Duties and Taxes</h2>
      <p>
        LTL is not responsible for any customs and taxes applied to your order.
        All fees imposed during or after shipping are the responsibility of the
        customer (tariffs, taxes, etc.).
      </p>
    </Container>
  );
};

export default ShippingPolicyScreen;
