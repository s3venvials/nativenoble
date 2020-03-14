let sendEmail = (protocol, message) => {
    return new Promise((resolve, reject) => {
      nodemailer.createTransport(protocol).sendMail(message, (err) => {
        if (err) reject(err);
        resolve("Done");
      });
    });
  }

  module.exports = { sendEmail };