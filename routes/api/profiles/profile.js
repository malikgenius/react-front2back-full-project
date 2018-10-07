const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const passport = require('passport');
const Joi = require('joi');
const ProfileValidation = require('./ProfileValidation-Joi');
const ExperienceValidation = require('./experienceValidation-joi');
const EducationValidation = require('./educationValidation-joi');
// twilio credentials
const twilioAccountSid = require('../../../config/Keys').twilioAccountSid;
const twilioAuthToken = require('../../../config/Keys').twilioAuthToken;
// GridFS Storage to hold profile images.
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');
// const mongoFullStackAuth = require('../config/Keys').mongoFullStackAuth;
const mongoFullStackAuth = require('../../../config/Keys').mongoFullStackAuth;
// Load Profile Model
const Profile = require('../../../model/Profile');
const User = require('../../../model/User');

//SMS To User Phone
// router.post('/sms', (req, res) => {
//   const client = require('twilio')(twilioAccountSid, twilioAuthToken);
//   const opts = {};
//   opts.body = 'This is my test sms from twilio';
//   opts.from = +18592096950;
//   opts.to = req.body.phone;
//   client.messages
//     .create(opts)
//     .then(message => {
//       res.json(message);
//     })
//     // .then(message => console.log(message.sid))
//     // .then(res.send(message))
//     .done();
// });

// Get Current User Profile
// @Private Route
router.get(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    Profile.findOne({
      user: req.user.id
    })
      // populate user info from user model and add it into response in profile fetch.
      .populate('user', [
        'local.name',
        'local.email',
        'local.photo',
        'google.name',
        'google.email',
        'google.photo',
        'facebook.name',
        'facebook.email',
        'facebook.photo'
      ])

      .then(profile => {
        if (!profile) {
          return res.status(404).json('Profile Not Found!');
        }
        return res.json(profile);
      })
      .catch(err => {
        return res.status(404).json(err);
      });
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Private
router.get(
  '/all',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    const errors = {};
    //paginate custom options we have to add all sorting, limiting etc in these options only.
    const pageNumber = req.query.page;
    // console.log(req.query.page);
    // paginate will send by default 10 records per page.
    // populate in pagination fixed by using it below, other ways do not work well with custom records from user.
    Profile.paginate(
      //  mongoDB Query for example:  SELECT * FROM profiles WHERE handle = "malikmazhar"
      // { handle: 'malikmazhar' },

      // below query is to find more than one, handle is matching all the given parameters.
      // { handle: { $in: ['malikmazhar', 'linuxgen', 'facebookuser'] } },

      // Query an Array but its case sensitive
      // { skills: ['No SKILLS'] },

      // we can leave the query empty like below if dont want any specific record.
      {},
      {
        // limit will come from frontend header or params but if it doesnt, default || 10 i set it up.
        limit: parseInt(20, 10) || 1,
        // page: page || 1,
        page: parseInt(pageNumber, 10) || 1,
        // sort by latest Date
        sort: { date: -1 },
        populate: {
          path: 'user',
          select: [
            'local.name',
            'local.email',
            'local.photo',
            'google.name',
            'google.email',
            'google.photo',
            'facebook.name',
            'facebook.email',
            'facebook.photo'
          ]
        }
      }
    )
      .then(profiles => {
        if (!profiles) {
          // errors.noprofile = 'There are no profiles';
          return res.status(404).json('There are no profiles');
        }

        return res.json(profiles);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Private
router.get(
  '/handle/:handle',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    // console.log(req.params.handle);
    Profile.findOne({ handle: req.params.handle })
      // it gets the profile by ID but not by handle .. need to research more on it.
      // Profile.findById(req.params.handle)
      .populate('user', [
        'local.name',
        'local.email',
        'local.photo',
        'google.name',
        'google.email',
        'google.photo',
        'facebook.name',
        'facebook.email',
        'facebook.photo'
      ])
      .then(profile => {
        if (!profile) {
          // errors.noprofile = 'There is no profile for this user';

          return res.status(404).json('There is no profile for this user');
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// BarCode Generate PNG from Barcode.

const bwipjs = require('bwip-js');

// bwipjs.toBuffer(
//   {
//     bcid: 'code128', // Barcode type
//     text: '0123456789', // Text to encode
//     scale: 3, // 3x scaling factor
//     height: 10, // Bar height, in millimeters
//     includetext: true, // Show human-readable text
//     textxalign: 'center' // Always good to set this
//   },
//   function(err, png) {
//     if (err) {
//       // Decide how to handle the error
//       // `err` may be a string or Error object
//     } else {
//       // `png` is a Buffer
//       // png.length           : PNG file length
//       // : PNG image width
//       png.readUInt32BE(16);
//       // : PNG image height
//       png.readUInt32BE(20);
//       res.send(png);
//     }
//   }
// );

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Private

router.get(
  '/user/:user_id',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.user_id })
      .populate('user', [
        'local.name',
        'local.email',
        'local.photo',
        'google.name',
        'google.email',
        'google.photo',
        'facebook.name',
        'facebook.email',
        'facebook.photo'
      ])
      .then(profile => {
        if (!profile) {
          return res.status(404).json('There is no profile for this user');
        }

        return res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// create storage object
const storage = new GridFsStorage({
  url: mongoFullStackAuth,
  useNewUrlParser: true,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        // Date + original Name will be the name of file in db.
        const filename = Date.now() + file.originalname;
        // buf.toString("hex") + path.extname(avatar.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// POST api/Profile
// @desc Create or Update user profile
// @Private Route

// router.post(
//   '/profileimage',
//   passport.authenticate('jwt', {
//     session: false
//   }),
//   upload.single('file'),
//   (req, res) => {
//     // console.log(req);
//     console.log(req.file);
//     // return res.json(req.file);
//     // console.log(req.headers);
//     // Joi Validation starts here ..
//     // return console.log(req.file.filename);

//     // Get Fields for Profile
//     const profileFields = {};
//     profileFields.user = req.user.id;
//     if (req.file) profileFields.image = req.file.filename;
//     // just to save everything about the image in db, only above filename property can be enough.
//     if (req.file) profileFields.file = req.file;
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       if (profile) {
//         // findOneAndUpdate will update existing profile if it found one.
//         Profile.findOneAndUpdate(
//           { user: req.user.id },
//           { $set: profileFields },
//           //new: true means res.json will return new updated profile, we dont provide new it will res.json(old profile)
//           //its just to see new updated profile on the fly in return and frontEnd
//           { new: true }
//         ).then(profile => {
//           return res.json(profile);
//         });
//       } else {
//         // it will Create a profile for user but will check the handle first, its a unique property for each user.
//         // Check if the handle exists  for SEO
//         Profile.findOne({ handle: profileFields.handle }).then(profile => {
//           if (profile) {
//             return res.status(400).json('Handle Exists');
//           }
//           // Save Profile
//           new Profile(profileFields).save().then(profile => {
//             return res.json(profile);
//           });
//         });
//       }
//     });
//   }
// );

// POST api/Profile
// @desc Create or Update user profile
// @Private Route
router.post(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    // console.log(req);
    console.log(req.file);
    console.log(req.headers);

    // Joi Validation starts here ..
    const {
      handle,
      company,
      website,
      location,
      status,
      bio,
      birthday,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      linkedin,
      instagram
    } = req.body;
    // // Joi Scheme
    const schema = {
      handle: Joi.string()
        .min(2)
        .max(40)
        .required(),
      company: Joi.string()
        .allow('')
        .min(2)
        .max(400),
      website: Joi.string()
        .allow('')
        .min(2)
        .max(100),
      location: Joi.string()
        .allow('')
        .min(2)
        .max(100),
      status: Joi.string()
        .min(2)
        .max(100)
        .required(),
      bio: Joi.string()
        .allow('')
        .min(2)
        .max(400),
      birthday: Joi.string().allow(''),
      githubusername: Joi.string()
        .allow('')
        .min(2)
        .max(40),
      skills: Joi.string()
        .min(2)
        .max(200)
        .required(),
      file: Joi.string(),
      youtube: Joi.string()
        .allow('')
        .min(5)
        .max(200),
      facebook: Joi.string()
        .allow('')
        .min(5)
        .max(200),
      twitter: Joi.string()
        .allow('')
        .min(5)
        .max(200),
      linkedin: Joi.string()
        .allow('')
        .min(5)
        .max(200),
      instagram: Joi.string()
        .allow('')
        .min(5)
        .max(200)
    };
    // Joi Validation Check
    const Validate = Joi.validate(req.body, schema);
    if (Validate.error) {
      console.log(Validate.error.details[0].message);
      return res.status(400).send(Validate.error.details[0].message);
    }
    // Get Fields for Profile
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    // Add birthday to send automatic sms and Emails check notification folder for more details.
    if (req.body.birthday) {
      const unixTime = parseInt(
        (new Date(req.body.birthday).getTime() / 1000).toFixed(0)
      );
      profileFields.birthday = unixTime;
    }
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Split into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }
    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.insagram) profileFields.social.insagram = req.body.insagram;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // findOneAndUpdate will update existing profile if it found one.
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          //new: true means res.json will return new updated profile, we dont provide new it will res.json(old profile)
          //its just to see new updated profile on the fly in return and frontEnd
          { new: true }
        ).then(profile => {
          return res.json(profile);
        });
      } else {
        // it will Create a profile for user but will check the handle first, its a unique property for each user.
        // Check if the handle exists  for SEO
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            return res.status(400).json('Handle Exists');
          }
          // Save Profile
          new Profile(profileFields).save().then(profile => {
            return res.json(profile);
          });
        });
      }
    });
  }
);

// Add Experience to profile
// @Private Route
router.post(
  '/experience',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    // ExperienceValidation(req.body, res);
    // Joi Validation
    const schema = {
      company: Joi.string()
        .min(3)
        .max(100)
        .required(),
      title: Joi.string()
        .min(3)
        .max(100)
        .required(),
      location: Joi.string()
        .min(3)
        .max(100)
        .required(),
      from: Joi.string()
        .min(3)
        .max(100)
        .required(),
      to: Joi.string()
        .allow('')
        .min(3)
        .max(100),
      current: Joi.boolean(),
      description: Joi.string()
        .allow('')
        .min(3)
        .max(200)
    };

    const Validate = Joi.validate(req.body, schema);
    if (Validate.error) {
      return res.status(400).send(Validate.error.details[0].message);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        return res.json('No Profile Associated');
      }
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.currnet,
        description: req.body.description
      };
      // to brin this experience at the top, we use unshift, if wanted it to be at end push would do the job.
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// Delete Experience from Profile by exp_id
// @Private Route
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    Profile.findOne(
      { user: req.user.id }
      // { new: true }
    )
      .then(profile => {
        // Get Remove Index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //Splice out of array ... we will take this item out of our array of experience
        profile.experience.splice(removeIndex, 1);
        //Save Profile and res.json
        profile.save().then(profile => {
          res.json(profile);
        });
      })
      .catch(err => {
        res.status(404).json(err);
      });
  }
);

// Add Education to profile
// @Private Route
router.post(
  '/education',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    // EducationValidation(req.body, res);
    // Joi Validation for education
    const schema = {
      school: Joi.string()
        .min(3)
        .max(100)
        .required(),
      degree: Joi.string()
        .min(3)
        .max(100)
        .required(),
      fieldofstudy: Joi.string()
        .min(3)
        .max(100)
        .required(),
      from: Joi.string()
        .min(3)
        .max(100)
        .required(),
      to: Joi.string()
        .min(3)
        .max(100)
        .allow(''),
      current: Joi.boolean(),
      description: Joi.string()
        .allow('')
        .min(3)
        .max(200)
    };
    const Validate = Joi.validate(req.body, schema);
    if (Validate.error) {
      return res.status(400).send(Validate.error.details[0].message);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        return res.json('No Profile Associated');
      }
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.currnet,
        description: req.body.description
      };
      // to brin this experience at the top, we use unshift, if wanted it to be at end push would do the job.
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
  }
);

// Delete Education
// @Private Route
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        return res.json('No Profile Associated with user');
      }
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);
      profile.education.splice(removeIndex, 1);
      profile
        .save()
        .then(profile => {
          res.json(profile);
        })
        .catch(err => {
          res.json(err);
        });
    });
  }
);

// Delete Profile
// @Private Route
router.delete(
  '/deleteprofile',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    // if we only want to delete the profile we can stop after below linke and after .then(() => res.json(bla bla bla ))
    Profile.findOneAndDelete({ user: req.user.id })
      .then(() => {
        // User.findOneAndDelete({ _id: req.user.id }).then(() =>
        return res.json('Sad to See you Going');
        // );
      })
      .catch(err => {
        return res.status(400).json('Something Went Wrong, Try again Later');
      });
  }
);

// Delete User
// @Private Route
router.delete(
  '/deleteuser',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Deleting User should also delete the Profile as we cant let abendant profile without user.
    Profile.findOneAndDelete({ user: req.user.id }).then(() => {
      User.findOneAndDelete({ _id: req.user.id })
        .then(() => {
          return res.json('Sad to See you Going');
        })
        .catch(err => {
          return res.status(400).json('Something Went Wrong, Try again Later');
        });
    });
  }
);
module.exports = router;
