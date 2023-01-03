import Joi from "joi";
import validate from "./validate";
import tlds from "/node_modules/@sideway/address/lib/tlds.js";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      tlds: {
        allow: tlds,
      },
    })
    .required()
    .label("Email"),
  password: Joi.string().trim().min(6).max(30).required().label("Password"),
});

const validateLogin = input => {
  const errors = {};

  const { error } = validate(loginSchema, input);

  if (error) {
    for (let errorItem of error.details) {
      const { context, message } = errorItem;

      errors[context.key] = [message];
    }
  }
  return errors;
};

export default validateLogin;
