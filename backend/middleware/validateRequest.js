import { validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error("Invalid information provided");
  }

  next();
};

export default validateRequest;
