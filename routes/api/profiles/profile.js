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

// Load Profile Model
const Profile = require('../../../model/Profile');
const User = require('../../../model/User');
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
        'google.name',
        'google.email',
        'facebook.name',
        'facebook.email'
      ])
      .then(profile => {
        if (!profile) {
          return res.status(404).json({ Error: 'Profile Not Found!' });
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

    Profile.find()
      .populate('user', [
        'local.name',
        'local.photo',
        'google.name',
        'google.photo',
        'facebook.name',
        'facebook.photo'
      ])
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = 'There are no profiles';
          return res.status(404).json(errors);
        }

        res.json(profiles);
      })
      .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
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
    const errors = {};

    Profile.findOne({ handle: req.params.handle })
      .populate('user', [
        'local.name',
        'local.photo',
        'google.name',
        'google.photo',
        'facebook.name',
        'facebook.photo'
      ])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

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
        'local.photo',
        'google.name',
        'google.photo',
        'facebook.name',
        'facebook.photo'
      ])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err =>
        res.status(404).json({ profile: 'There is no profile for this user' })
      );
  }
);

// POST api/Profile
// @desc Create or Update user profile
// @Private Route
router.post(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
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
        .max(40)
        .required(),
      bio: Joi.string()
        .allow('')
        .min(2)
        .max(40),
      birthday: Joi.string().allow(''),
      githubusername: Joi.string()
        .allow('')
        .min(2)
        .max(40),
      skills: Joi.string()
        .min(2)
        .max(100)
        .required(),
      youtube: Joi.string()
        .allow('')
        .min(5)
        .max(100),
      facebook: Joi.string()
        .allow('')
        .min(5)
        .max(100),
      twitter: Joi.string()
        .allow('')
        .min(5)
        .max(100),
      linkedin: Joi.string()
        .allow('')
        .min(5)
        .max(100),
      instagram: Joi.string()
        .allow('')
        .min(5)
        .max(100)
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
        // Create
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
    ExperienceValidation(req.body, res);
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
    EducationValidation(req.body, res);
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
