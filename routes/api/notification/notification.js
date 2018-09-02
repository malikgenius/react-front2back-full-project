const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const GmailUser = require('../../../config/Keys').GmailUser;
const GmailPass = require('../../../config/Keys').GmailPass;
// twilio accesscode and auth
const twilioAccountSid = require('../../../config/Keys').twilioAccountSid;
const twilioAuthToken = require('../../../config/Keys').twilioAuthToken;
// const client = require('twilio')(twilioAccountSid, twilioAuthToken);

// Email to User

router.post('/email', (req, res) => {
  const emailTo = req.body.email;
  // node Mailer function ..
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      // secure: false, // true for 465, false for other ports
      auth: {
        user: GmailUser, // generated ethereal user
        pass: GmailPass, // generated ethereal password
        requireTLS: true
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Fred Foo 👻" <pooja@zeenah.com>', // sender address
      to: emailTo, // list of receivers
      subject: 'ZEELIST SERVER STARTED', // Subject line
      text: 'HELLO ADMIN', // plain text body
      html: '<b>Hello world?</b>' // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      res.json(info);
      console.log('Message sent: %s', info.messageId);
      console.log(`message sent to ${emailTo}`);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
});

//SMS To User Phone
router.post('/sms', (req, res) => {
  const client = require('twilio')(twilioAccountSid, twilioAuthToken);
  const opts = {};
  opts.body = 'This is my test sms from twilio';
  opts.from = +18592096950;
  opts.to = req.body.phone;
  client.messages
    .create(opts)
    .then(message => {
      res.json(message);
    })
    // .then(message => console.log(message.sid))
    // .then(res.send(message))
    .done();
});

module.exports = router;
