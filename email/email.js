import nodeemailer from "nodemailer";
import { emailHtml } from "./emailHtml.js";

export const sendEmails = async (email, otp) => {
  const transporter = nodeemailer.createTransport({
    service: "gmail",
    auth: {
      user: "manarhajjaj16@gmail.com",
      pass: "jnkvexflrsqrgpwf",
    },
  });

  const info = await transporter.sendMail({
    from: '"Assignment9 Admin" <manarhajjaj16@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Otp for email verification", // Subject line
    html: emailHtml(otp), // html body
  });
};
