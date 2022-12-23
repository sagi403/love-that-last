const validate = (schema, objToValidate) => {
  return schema.validate(objToValidate, { abortEarly: false });
};

export default validate;
