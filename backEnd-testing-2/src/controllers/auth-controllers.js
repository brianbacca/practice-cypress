const { createUser, login, findUserByEmail } = require('../data/user-data');

module.exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: 'email and password are required' });
    }
    const user = await findUserByEmail({ email });
    if (user) {
      return res.status(400).send({ message: 'User already exists' });
    }
    await createUser({ email, password });
    return res.status(200).send({ message: 'success' });
  } catch (e) {
    res.status(500).send({ message: 'There was an unexpected error' });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: 'Email and password are required' });
    }

    const token = await login({ email, password });
    return res.status(200).send({ token });
  } catch (e) {
    // console.log('ERRRORRR', e.message);
    if (e.message === 'Invalid email or password') {
      return res.status(400).send({ message: 'Email or password incorrect' });
    }

    next(e);
  }
};
