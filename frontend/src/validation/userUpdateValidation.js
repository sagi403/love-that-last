import Joi from "joi";
import validate from "./validate";
import tlds from "/node_modules/@sideway/address/lib/tlds.js";

const userUpdateSchema = Joi.object({
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

const validateUserUpdate = input => {
  return validate(userUpdateSchema, input);
};

export default validateUserUpdate;
