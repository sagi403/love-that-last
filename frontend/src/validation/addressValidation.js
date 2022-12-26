import Joi from "joi";
import validate from "./validate";

const addressSchema = Joi.object({
  address: Joi.string().min(2).required().label("Address"),
  city: Joi.string().min(2).required().label("City"),
  postalCode: Joi.string().min(2).required().label("PostalCode"),
  country: Joi.string().min(2).required().label("Country"),
});

const validateAddress = input => {
  return validate(addressSchema, input);
};

export default validateAddress;
