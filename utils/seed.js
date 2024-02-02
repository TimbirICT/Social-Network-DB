
const { connect } = require('../config/connection'); 
const seedData = require('../utils/data');

// Connect to the database
connect();

// Seed the data
seedData();
