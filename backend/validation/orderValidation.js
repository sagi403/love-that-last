import { body, param } from "express-validator";

const regex = /^[a-fA-F0-9]{24}$/;

export const addOrderItemsValidation = [
  body("orderItems")
    .isArray({ min: 1 })
    .custom(items => {
      for (let item of items) {
        if (
          !(
            typeof item.name === "string" &&
            typeof item.qty === "number" &&
            typeof item.image === "string" &&
            typeof item.price === "number" &&
            regex.test(item.product)
          )
        ) {
          return false;
        }
      }
      return true;
    }),
  body("shippingAddress").custom(item => {
    return (
      typeof item.address === "string" &&
      typeof item.city === "string" &&
      typeof item.postalCode === "string" &&
      typeof item.country === "string"
    );
  }),
  body("paymentMethod").isString().trim().isLength({ min: 2, max: 255 }),
  body("itemsPrice").isNumeric(),
  body("taxPrice").isNumeric(),
  body("shippingPrice").isNumeric(),
  body("totalPrice").isNumeric(),
];

export const getOrderByIdValidation = [
  param("id")
    .matches(/^[a-fA-F0-9]{24}$/)
    .trim(),
];
