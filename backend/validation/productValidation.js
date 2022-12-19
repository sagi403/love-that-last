import { param } from "express-validator";

export const getProductByIdValidation = [
  param("id")
    .matches(/^[a-fA-F0-9]{24}$/)
    .trim(),
];

export const deleteProductValidation = [
  param("id")
    .matches(/^[a-fA-F0-9]{24}$/)
    .trim(),
];
