import Joi from "joi";
import validate from "./validate";

const addressSchema = Joi.object({
  address: Joi.string().min(2).required().label("Address"),
  city: Joi.string().min(2).required().label("City"),
  postalCode: Joi.string().min(2).required().label("PostalCode"),
  country: Joi.string().min(2).required().label("Country"),
});

const validateAddress = input => {
  const errors = {};

  const { error } = validate(addressSchema, input);

  if (error) {
    for (let errorItem of error.details) {
      const { context, message } = errorItem;

      errors[context.key] = [message];
    }
  }
  return errors;
};

export default validateAddress;
