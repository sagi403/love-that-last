import Joi from "joi";
import validate from "./validate";
import tlds from "/node_modules/@sideway/address/lib/tlds.js";

const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email({
      tlds: {
        allow: tlds,
      },
    })
    .required()
    .label("Email"),
});

const validateForgotPassword = input => {
  const errors = {};

  const { error } = validate(forgotPasswordSchema, input);

  if (error) {
    for (let errorItem of error.details) {
      const { context, message } = errorItem;

      errors[context.key] = [message];
    }
  }
  return errors;
};

export default validateForgotPassword;
