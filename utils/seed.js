// seed.js

const { connect } = require('../config/connection'); // Adjust the path based on your project structure
const seedData = require('../utils/data');

// Connect to the database
connect();

// Seed the data
seedData();
