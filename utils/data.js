const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

const initData = async () => {
  // Creating users
  const user1 = await User.create({
    username: 'exampleUser',
    email: 'example@example.com',
  });

  const user2 = await User.create({
    username: 'anotherUser',
    email: 'another@example.com',
  });

  // Creating thoughts
  const thought1 = await Thought.create({
    thoughtText: 'This is a sample thought.',
    username: user1.username,
  });

  const thought2 = await Thought.create({
    thoughtText: 'Another interesting thought.',
    username: user2.username,
  });

  // Creating reactions
  const reaction1 = await Reaction.create({
    reactionBody: 'Interesting thought!',
    username: 'thirdUser',
  });

  const reaction2 = await Reaction.create({
    reactionBody: 'I agree!',
    username: 'fourthUser',
  });

  // Adding reactions to thoughts
  thought1.reactions.push(reaction1);
  await thought1.save();

  thought2.reactions.push(reaction2);
  await thought2.save();

  // Establishing friendship
  user1.friends.push(user2._id);
  await user1.save();

  user2.friends.push(user1._id);
  await user2.save();

  console.log('Data generated successfully!');
};

module.exports = initData;
