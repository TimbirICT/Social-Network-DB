const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

const initData = async () => {
  // creating a user
  const user1 = await User.create({
    username: 'exampleUser',
    email: 'example@example.com',
  });

  // creating a thought
  const thought1 = await Thought.create({
    thoughtText: 'This is a sample thought.',
    username: user1.username,
  });

  // Creating a reaction
  const reaction1 = await Reaction.create({
    reactionBody: 'Interesting thought!',
    username: 'anotherUser',
  });

  // Adding the reaction to the thought
  thought1.reactions.push(reaction1);
  await thought1.save();

  console.log('Data generated successfully!');
};

module.exports = initData;
