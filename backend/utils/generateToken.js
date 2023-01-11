import jwt from "jsonwebtoken";

const generateToken = (
  payload,
  secret = process.env.JWT_SECRET,
  expiresIn = "30d"
) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export default generateToken;
