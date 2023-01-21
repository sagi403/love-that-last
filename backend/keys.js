import dotenv from "dotenv";

dotenv.config();

const keys = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  url: process.env.URL,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
  email: process.env.EMAIL,
  paypalClientId: process.env.PAYPAL_CLIENT_ID,
};

const checkEnvVariables = keys => {
  for (let key in keys) {
    if (!keys[key]) {
      throw new Error(`${key} must be defined`);
    }
  }
};

export { keys, checkEnvVariables };
