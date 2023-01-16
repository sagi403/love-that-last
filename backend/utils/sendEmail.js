import nodemailer from "nodemailer";
import { keys } from "../keys.js";

export const sendEmail = async ({
  email,
  userName,
  link,
  expiresIn = "15 minute",
}) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: keys.emailUser,
      pass: keys.emailPassword,
    },
  });

  await transporter.sendMail({
    from: keys.email,
    to: email,
    subject: "Reset you password!",
    text: `Hello ${userName},

    We received a request to reset your password. If you didn't make this request, please ignore this email.
    
    To reset your password, click on the link below:
    
    ${link}
    
    This link will expire in ${expiresIn}.
    
    If you have any issues, please contact our support team.
    
    Best regard,
    LTL team`,
  });
};
