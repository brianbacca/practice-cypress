require('dotenv').config();
const app = require('./app');
const { connectDb } = require('./db/mongo');

const port = process.env.PORT;

const uri = process.env.URI;

if (require.main === module) {
  connectDb({ uri }).then(() => {
    console.log('DB connected');
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  });
}

module.exports = app;
