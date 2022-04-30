const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

module.exports.sign = (payload) => {
  return jwt.sign(payload, secret);
};

module.exports.verify = (token) => {
  return jwt.verify(token, secret);
};
