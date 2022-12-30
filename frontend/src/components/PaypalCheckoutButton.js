import { PayPalButtons } from "@paypal/react-paypal-js";

const PaypalCheckoutButton = ({ price, error, success }) => {
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: price,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();

        success(order);
      }}
      onError={err => {
        error(err);
      }}
    />
  );
};

export default PaypalCheckoutButton;
