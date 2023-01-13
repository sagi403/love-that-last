import { body, param, query } from "express-validator";

export const getAllUsersValidation = [
  query("pageNumber").isNumeric().optional({ checkFalsy: true }),
];

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

export const getUserByIdValidation = [
  param("id")
    .matches(/^[a-fA-F0-9]{24}$/)
    .trim(),
];

export const updateUserAsAdminValidation = [
  param("id")
    .matches(/^[a-fA-F0-9]{24}$/)
    .trim(),
  body("name").isString().isLength({ min: 2 }),
  body("email").isEmail(),
  body("isAdmin").isBoolean(),
];

export const deleteUserValidation = [
  param("id")
    .matches(/^[a-fA-F0-9]{24}$/)
    .trim(),
];

export const forgotPasswordValidation = [body("email").isEmail()];

export const resetPasswordValidation = [
  param("id").matches(/^[a-fA-F0-9]{24}$/),
  param("token").matches(
    /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
  ),
  body("password")
    .trim()
    .isLength({ min: 6, max: 30 })
    .matches(/[a-z]{1,}[A-Z]{1,}[0-9]{1,}[!@#$%&*]{1,}/),
];

export const authResetPasswordValidation = [
  param("id").matches(/^[a-fA-F0-9]{24}$/),
  param("token").matches(
    /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/
  ),
];
