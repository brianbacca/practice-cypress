const mongoose = require('mongoose');

module.exports.validateRequiredValues = (req, res, next) => {
  const { name, size, description } = req.body;

  if (!name || !size || !description) {
    res.status(400).send({
      error: 'name, size, and description are required',
    });
  }

  next();
};

module.exports.validateId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).send({
      error: `the ${id} is not a valid id`,
    });
    return;
  }
  next();
};
