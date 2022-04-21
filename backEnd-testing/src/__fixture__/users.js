module.exports.buildUser = ({
  name = 'john',
  address = 'fake address',
  age = 20,
  uid = 1,
} = {}) => ({
  name,
  address,
  age,
  uid,
});
