const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
let mongo = null;
module.exports.connectDb = ({ uri }) => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports.createUri = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = await mongo.getUri();
  return uri;
};

module.exports.closeDb = async () => {
  await mongoose.disconnect();
  await mongo.stop();
};
