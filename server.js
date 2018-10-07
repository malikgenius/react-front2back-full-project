const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const fs = require('fs');
const path = require('path');

// require('./mongodb/mongodb');
// mongodb load on startup
if (process.env.NODE_ENV === 'production') {
  require('./mongodb/mongodbMlab');
} else {
  require('./mongodb/mongodb');
}

// web-push for push notifications

//Routes
const push = require('./routes/api/notification/pushnotification');
const notification = require('./routes/api/notification/notification');
const users = require('./routes/api/users/users');
const reset_verify = require('./routes/api/users/reset_verify');
const profile = require('./routes/api/profiles/profile');
const upload = require('./routes/api/profiles/uploadRoute');

const posts = require('./routes/api/posts/posts');
const comments = require('./routes/api/comments/comments');

// MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use(passport.initialize());

//Passport Jwt Strategy, Google & Facebook
require('./passport/passport');

// Grid init

//Logging
app.use(morgan('combined'));
app.use(
  morgan('common', {
    stream: fs.createWriteStream('./access.log', { flags: 'a' })
  })
);

// CORS Allowed, if app sends request to thirdparty we need CORS or will get an error.
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Routes
app.use('/api/push', push);
app.use('/api/users', users);
app.use('/api/reset', reset_verify);
app.use('/api/profile', profile);
app.use('/api/notification', notification);
app.use('/api/posts', posts);
app.use('/api/comments', comments);
app.use('/api/upload', upload);

// Server static assets if in production

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Schedule to send emails and SMS to users on specific date.
// require('./notifications/email-scheduler');
// require('./notifications/sms-twillio-scheduler');
// require("./notifications/email-schedular-1day-advance");
// require("./notifications/datetest");

const port = process.env.PORT || 5000;
const Environment = process.env.NODE_ENV;
app.listen(port, err => {
  if (err) {
    return console.log(`Error: ${err}`);
  }
  console.log(`MERN Front2Back App is listening on ${port}`);
});
