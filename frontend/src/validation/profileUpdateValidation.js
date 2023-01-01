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
  return validate(profileUpdateSchema, input);
};

export default validateProfileUpdate;
