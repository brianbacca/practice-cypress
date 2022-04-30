const { verify } = require('../utils/jwt');

module.exports.isAuthHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ message: 'The Authorization header was not sent' });
  }

  const [init, token] = req.headers.authorization.split(' ');

  if (init !== 'Bearer') {
    return res
      .status(403)
      .send({ message: 'The Authorization header does not contain Bearer' });
  }

  try {
    const payloadDecoded = verify(token);

    req.data = {};
    req.data.payload = payloadDecoded;

    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({ message: 'Invalid token authentication' });
  }
};
