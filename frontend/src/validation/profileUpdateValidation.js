import Joi from "joi";
import tlds from "/node_modules/@sideway/address/lib/tlds.js";
import validate from "./validate";

const profileUpdateSchema = Joi.object({
  name: Joi.string().min(2).required().label("Name"),
  email: Joi.string()
    .email({
      tlds: {
        allow: tlds,
      },
    })
    .required()
    .label("Email"),
});

const validateProfileUpdate = input => {
  const errors = {};

  const { error } = validate(profileUpdateSchema, input);

  if (error) {
    for (let errorItem of error.details) {
      const { context, message } = errorItem;

      errors[context.key] = [message];
    }
  }
  return errors;
};

export default validateProfileUpdate;
