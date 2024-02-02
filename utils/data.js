// utils/data.js

const User = require('../models/User'); // Adjust the path based on your project structure
const Thought = require('../models/Thought'); // Adjust the path based on your project structure
const Reaction = require('../models/Reaction'); // Adjust the path based on your project structure

const initData = async () => {
  // Your data generation logic here

  // Example: Creating a user
  const user1 = await User.create({
    username: 'exampleUser',
    email: 'example@example.com',
  });

  // Example: Creating a thought
  const thought1 = await Thought.create({
    thoughtText: 'This is a sample thought.',
    username: user1.username,
  });

  // Example: Creating a reaction
  const reaction1 = await Reaction.create({
    reactionBody: 'Interesting thought!',
    username: 'anotherUser',
  });

  // Adding the reaction to the thought
  thought1.reactions.push(reaction1);
  await thought1.save();

  // Continue with more data creation as needed

  console.log('Data generated successfully!');
};

module.exports = initData;
