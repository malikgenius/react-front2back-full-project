const Joi = require('joi');

module.exports = function ProfileValidation(data, res) {
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
  } = data;

  // Joi Scheme
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
      .allow('')
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
      .allow('')
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

  const Validate = Joi.validate(data, schema);
  if (Validate.error) {
    return res.status(400).send(Validate.error.details[0].message);
  }
};

// module.exports = ProfileValidation;
