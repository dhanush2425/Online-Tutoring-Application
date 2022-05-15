const Student = require("../models/student");
const Tutor = require("../models/tutor");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
  if (err.message === "incorrect email") {
    errors.email = "that email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "The password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "the email is already taken";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge
  })
};

module.exports.signup = async (req, res) => {
  const { name, email, password, type } = req.body;
  let fileName = "default.jpg";
  if (req.file) {
    fileName = req.file.filename;
  }
  try {
    let user = null;
    if (type === 'Student') {
      user = await Student.create({ name, email, password, fileName });
    } else if (type === 'Tutor') {
      user = await Tutor.create({ name, email, password, fileName });
    }
    const token = createToken(user._id);
    res.cookie('jwt', token, { maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send(errors);
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};
