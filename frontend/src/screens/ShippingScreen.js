import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validateAddress from "../validation/addressValidation";
import FormItem from "../components/FormItem";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../store/cartSlice";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector(state => state.cart);

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");
  const [errorsMessage, setErrorsMessage] = useState({
    address: null,
    city: null,
    postalCode: null,
    country: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();

    const errors = {};
    const { error } = validateAddress({ address, city, postalCode, country });

    if (error) {
      for (let errorItem of error.details) {
        const { context, message } = errorItem;

        errors[context.key] = [message];
      }

      setErrorsMessage(errors);
      return;
    }

    setErrorsMessage({
      address: null,
      city: null,
      postalCode: null,
      country: null,
    });
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <FormItem
          controlId="address"
          label="Address"
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          message={errorsMessage && errorsMessage.address}
        />
        <FormItem
          controlId="city"
          label="City"
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={e => setCity(e.target.value)}
          message={errorsMessage && errorsMessage.city}
        />
        <FormItem
          controlId="postalCode"
          label="Postal Code"
          type="text"
          placeholder="Enter postal code"
          value={postalCode}
          onChange={e => setPostalCode(e.target.value)}
          message={errorsMessage && errorsMessage.postalCode}
        />
        <FormItem
          controlId="country"
          label="Country"
          type="text"
          placeholder="Enter country"
          value={country}
          onChange={e => setCountry(e.target.value)}
          message={errorsMessage && errorsMessage.country}
        />
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
