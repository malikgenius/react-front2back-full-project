const mongoose = require('mongoose');
const mongoFullStackAuth = require('../config/Keys').mongoFullStackAuth;
const Grid = require('gridfs-stream');
const fs = require('fs');
mongoose.Promise = global.Promise;

// Gridfs for files upload
// let gfs;
// const conn = mongoose.createConnection(mongoFullStackAuth, {
//   useNewUrlParser: true
// });
// gridfs-stream opening another connection to mongodb to upload files ..

// conn
//   .once('open', () => {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads');
//     console.log('Local MongDB & GridFS connected ');
//   })
//   .catch(err => {
//     res.json(err);
//   });

// module.exports = conn;

// Simple mongoose.com to only open single connection to DB.
mongoose
  .connect(
    mongoFullStackAuth,
    { useNewUrlParser: true }
  )
  .then(err => {
    console.log('mongoFullStackAuth is locally connected!');
  })
  .catch(err => {
    console.log('error:', err);
  });

// GridFS trying again

// const conn = mongoose.connection;

// Grid.mongo = mongoose.mongo;
// conn.once('open', () => {
//   console.log('GridFS opend');
//   const gfs = Grid(conn.db);
//   // streaming to gridfs
//   //filename to store in mongodb
//   const writestream = gfs.createWriteStream({
//     filename: 'mongo_file.txt'
//   });
//   // fs.createReadStream(
//   //   'C:Usersmalik.TBWAZEENAHDesktop\fullstack Projects\01-react-front2back-full-project'
//   // ).pipe(writestream);

//   writestream.on('close', function(file) {
//     // do something with `file`
//     console.log(file.filename + 'Written To DB');
//   });
// });
