const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,  // <-- This line is deprecated
  useFindAndModify: false,  // <-- This line is deprecated
});

module.exports = connection;
