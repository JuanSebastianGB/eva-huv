const nodemailer = require('nodemailer');
require('dotenv').config();

const configure = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

class MailController {
  /**
   * It creates a transporter object using the nodemailer.createTransport() method,
   * and then sends the
   * email using the transporter.sendMail() method
   * @returns The info object is being returned.
   */
  static sendMail(options = '') {
    const transporter = nodemailer.createTransport(configure);
    let mailOptions = {
      from: 'evagestionahuv@gmail.com',
      to: 'electromedicina2huv@gmail.com',
      subject: 'Sending Email using Node.js',
      html: '<b>Hello world this is an email send by using Node :)</b>',
    };
    if (options !== '') {
      const { from, to, subject, html } = options;
      mailOptions = {
        ...mailOptions,
        from: from || mailOptions.from,
        to: to || mailOptions.to,
        subject: subject || mailOptions.subject,
        html: html || mailOptions.html,
      };
    }
    const info = transporter.sendMail(mailOptions);
    return { info };
  }

  /**
   * It sends an email
   * @param req - The request object.
   * @param res - The response object.
   * @returns a json with the emailSended variable.
   */
  static async emailEndpoint(req, res) {
    const to = ['jsebastiangb.12@gmail.com', 'electromedicina2huv@gmail.com'];
    const subject = 'Only test';
    const html = `<section>
      <h1>Test Mail:</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo exercitationem suscipit repellat laboriosam officiis temporibus quia quaerat vitae minus itaque nihil corporis minima ex ipsam, sint doloribus! Totam, molestiae veniam?</p>
    </section>`;
    const emailSended = MailController.sendMail({ to, subject, html });
    return res.status(200).json({ emailSended });
  }
}

module.exports = MailController;
