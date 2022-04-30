const bcrypt = require('bcrypt');

const User = require('../models/user-model');
const { sign } = require('../utils/jwt');

const hash = (str, saltRounds = 10) => {
  return bcrypt.hash(str, saltRounds);
};

const veryfyHash = (normalStr, hashStr) => {
  return bcrypt.compare(normalStr, hashStr);
};

module.exports.createUser = async ({ email, password }) => {
  const passwordHashed = await hash(password);

  const user = new User({
    email,
    password: passwordHashed,
  });
  return user.save();
};

module.exports.login = async ({ email, password }) => {
  const user = await this.findUserByEmail({ email });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isCorrectPassword = await veryfyHash(password, user.password);

  if (!isCorrectPassword) {
    throw new Error('Invalid email or password');
  }

  const token = sign({
    email: user.email,
  });

  return token;
};

module.exports.findUserByEmail = ({ email }) => {
  return User.findOne({ email }).exec();
};
