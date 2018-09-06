const mongoose = require('mongoose');
const mongoMernFront2BackMlab = require('../config/Keys')
  .mongoMernFront2BackMlab;
// Simple mongoose.com to only open single connection to DB.

mongoose
  .connect(
    mongoMernFront2BackMlab,
    { useNewUrlParser: true }
  )
  .then(err => {
    console.log('mongoFullStackAuth Mlab is connected!');
  })
  .catch(err => {
    console.log('error:', err);
  });
