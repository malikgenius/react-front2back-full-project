const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },

  handle: {
    type: String,
    required: true,
    max: 40,
    lowercase: true
  },
  company: {
    type: String,
    lowercase: true
  },
  website: {
    type: String,
    lowercase: true
  },
  location: {
    type: String,
    lowercase: true
  },
  status: {
    type: String,
    required: true,
    lowercase: true
  },
  skills: {
    type: [String],
    required: true,
    lowercase: true
  },
  bio: {
    type: String
  },
  birthday: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],

  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    linkedin: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

ProfileSchema.plugin(mongoosePaginate);
// const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile = mongoose.model('profile', ProfileSchema);
