import Joi from "joi";
import validate from "./validate";

const productUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(255).required().label("Name"),
  price: Joi.number().required().label("Price"),
  beforeSalePrice: Joi.number().label("Before Sale Price"),
  image: Joi.string().min(2).max(255).required().label("Image"),
  brand: Joi.string().min(2).max(255).required().label("Brand"),
  category: Joi.string().min(2).max(255).required().label("Category"),
  countInStock: Joi.number().required().label("Count In Stock"),
  description: Joi.string().min(2).max(1000).required().label("Description"),
  longDescription: Joi.string().min(2).required().label("Long Description"),
});

const validateProductUpdate = input => {
  const errors = {};

  const { error } = validate(productUpdateSchema, input);

  if (error) {
    for (let errorItem of error.details) {
      const { context, message } = errorItem;

      errors[context.key] = [message];
    }
  }
  return errors;
};

export default validateProductUpdate;
