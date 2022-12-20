import { body } from "express-validator";

export const loginUserValidation = [
  body("email").isEmail(),
  body("password").trim().notEmpty(),
];

export const registerUserValidation = [
  body("name").isString().isLength({ min: 2 }),
  body("email").isEmail(),
  body("password")
    .trim()
    .isLength({ min: 6, max: 30 })
    .matches(/[a-z]{1,}[A-Z]{1,}[0-9]{1,}[!@#$%&*]{1,}/),
];

export const updateUserProfileValidation = [
  body("name").isString().isLength({ min: 2 }).optional({ checkFalsy: true }),
  body("email").isEmail().optional({ checkFalsy: true }),
  body("password")
    .trim()
    .isLength({ min: 6, max: 30 })
    .matches(/[a-z]{1,}[A-Z]{1,}[0-9]{1,}[!@#$%&*]{1,}/)
    .optional({ checkFalsy: true }),
];
