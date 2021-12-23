const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  //validate
  //   const { error } = registerValidation(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);
  console.log(req.body, "body");

  //   checking account already exist
  const alreadyExists = await User.findOne({ username: req.body.username });
  if (alreadyExists) return res.status(400).send("alreadyExists");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(user._id);
  } catch (err) {
    res.status(404).send(err);
  }
};

const findUser = async (req, res) => {
  //validate
  //   const { error } = loginValidation(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  //   checking account already exist
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("doesnt exist");

  // checking password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("invalid Password");

  // Create and assign token
  const token = jwt.sign({user: user._id}, process.env.TOKEN_SECRET);
  res.json({ status: "Logged In", user: token });
};

module.exports = { createUser, findUser };
