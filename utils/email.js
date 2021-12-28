const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `From admin`;
  }
  createTransport() {
    return nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        password: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async sendMail() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Hello",
      text: "Hello world",
      html: `<h1>Hello ${this.firstName}</h1>. Click to ${this.url} for authentication`,
    };
    await this.createTransport().sendMail(mailOptions);
  }
};
