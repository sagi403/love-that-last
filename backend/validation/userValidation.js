import { body } from "express-validator";

export const loginUserValidation = [
  body("email").isEmail(),
  body("password").trim().notEmpty(),
];
