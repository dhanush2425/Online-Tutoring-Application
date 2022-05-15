const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userOptions = {
  discriminatorKey: 'itemType',
  collection: 'Users'
}

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: false
  },
  accent: {
    type: String,
    required: false,
    default: "US"
  },
  fileName: {
    type: String,
    required: false,
  }
}, userOptions);

/*
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
}
*/
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    if (user.password===password) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
}

const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User');