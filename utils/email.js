const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: "./../config.env" });

console.log(process.env.EMAIL_PASSWORD, process.env.EMAIL_USERNAME);
module.exports = class Email {
  constructor(user, code) {
    this.to = user.email;
    this.firstName = user.name;
    this.code = code;
    this.from = `From admin`;
  }
  createTransport() {
    return nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  async sendMail() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Hello",
      text: "Hello world",
      html: `<h1>Hello ${this.firstName}</h1>. Your code is ${this.code}`,
    };
    await this.createTransport().sendMail(mailOptions);
  }
};
