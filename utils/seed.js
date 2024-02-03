const connection = require('../config/connection');
const seedData = require('../utils/data');

// Connect to the database
connection.once('open', async () => {
  try {
    // Seed the data
    await seedData();
    console.log('Data generated successfully!');
    // Close the connection after seeding
    connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    // Close the connection in case of an error
    connection.close();
  }
});

// Handle connection errors
connection.on('error', (error) => {
  console.error('Error connecting to the database:', error);
  process.exit(1);   // Exit the process with an error code if there is an error
});
