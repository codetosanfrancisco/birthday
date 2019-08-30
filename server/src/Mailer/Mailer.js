var nodemailer = require("nodemailer");
require("dotenv").config();
const Email = require("email-templates");
const email = new Email();

var smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    XOAuth2: {
      user: process.env.GOOGLE_EMAIL_USER, // Your gmail address.
      clientId: process.env.GOOGLE_MAIL_CLIENT_ID,
      clientSecret: process.env.GOOGLE_MAIL_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    }
  }
});

module.exports = { smtpTransport };
