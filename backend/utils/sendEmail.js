import nodemailer from "nodemailer";

export const sendEmail = async ({
  email,
  userName,
  link,
  expiresIn = "15 minute",
}) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: "sagilevi92@gmail.com>",
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
