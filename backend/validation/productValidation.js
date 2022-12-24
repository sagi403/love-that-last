import { param, body } from "express-validator";

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

export const updateProductValidation = [
  body("name").isString().isLength({ min: 2, max: 255 }),
  body("price").isNumeric(),
  body("beforeSalePrice").isNumeric().optional(),
  body("image").trim().isString().isLength({ min: 2, max: 255 }),
  body("brand").trim().isString().isLength({ min: 2, max: 255 }),
  body("category").trim().isString().isLength({ min: 2, max: 255 }),
  body("countInStock").isNumeric(),
  body("description").trim().isString().isLength({ min: 2, max: 1000 }),
  body("longDescription").trim().isString().isLength({ min: 2 }),
];
