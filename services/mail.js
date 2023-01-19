const nodemailer = require("nodemailer");

class MailService {
  static async mail(receiverMail, subject, text, files) {
    try {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();

      let transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER_URL,
        port: process.env.SMTP_SERVER_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_SERVER_USER, // generated ethereal user
          pass: process.env.SMTP_SERVER_PW, // generated ethereal password
        },
      });

      // send mail with defined transport object
      const mailBody = {
        from: process.env.SMTP_SENDER_MAIL, // sender address
        to: receiverMail, // list of receivers
        subject: "New Mail From Slack Messages",
        attachments: files// Subject line
      };

      if (text) {
        mailBody.text = text;
        mailBody.html = text;
      }

      let info = await transporter.sendMail(mailBody);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = MailService;
