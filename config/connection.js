const mongoose = require('mongoose');

// Connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

// Export the connection object
module.exports = mongoose.connection;
