module.exports.buildProduct = ({
  name = 'fake',
  size = 1,
  description = 'test',
  _id = 'abc',
} = {}) => ({
  name,
  size,
  description,
  _id,
});
