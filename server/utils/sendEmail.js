import nodemailer from "nodemailer";

//OAuth2 Method

// import { google } from "googleapis";
// import dotenv from "dotenv";
// dotenv.config({ path: "config/.env" });

// const OAuth2Client = new google.auth.OAuth2({
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   redirectUri: process.env.REDIRECT_URL,
// });

// OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

// const sendEmail = async (mailDetails) => {
//   const accessToken = await OAuth2Client.getAccessToken();

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: "notetake63@gmail.com",
//       clientId: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       refreshToken: process.env.REFRESH_TOKEN,
//       accessToken: accessToken,
//     },
//   });

//   const mailoptions = {
//     from: "NoteTake <notetake63@gmail.com>",
//     to: mailDetails.to,
//     subject: mailDetails.subject,
//     text: mailDetails.text,
//     html: mailDetails.html,
//   };
//   const result = await transporter.sendMail(mailoptions);
//   return result;
// };

// -------------------------------------------------

//Simple SMTP Method Using Gmail

const sendEmail = async (mailDetails) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "projects.chiragverma@gmail.com",
      pass: process.env.PASS,
    },
  });

  const mailoptions = {
    from: "NoteTake <projects.chiragverma@gmail.com>",
    to: mailDetails.to,
    subject: mailDetails.subject,
    text: mailDetails.text,
    html: mailDetails.html,
  };

  try {
    const result = await transporter.sendMail(mailoptions);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
