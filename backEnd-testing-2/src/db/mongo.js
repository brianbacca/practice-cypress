const mongoose = require('mongoose');
module.exports.connectDb = ({ uri }) => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
