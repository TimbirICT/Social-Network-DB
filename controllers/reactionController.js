
const { Thought } = require('../models');
const { handleServerError } = require('../utils/errorHandler');

const reactionController = {
  // POST /api/thoughts/:thoughtId/reactions
  createReaction: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const reaction = req.body;

      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ error: 'Thought not found.' });
      }

      thought.reactions.push(reaction);
      await thought.save();

      res.status(201).json({ message: 'Reaction added successfully.', thought });
    } catch (error) {
      handleServerError(error, res);
    }
  },

  // DELETE /api/thoughts/:thoughtId/reactions/:reactionId
  removeReaction: async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;

      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ error: 'Thought not found.' });
      }

      // Remove the reaction by its ID
      thought.reactions = thought.reactions.filter((reaction) => reaction._id.toString() !== reactionId);
      await thought.save();

      res.status(200).json({ message: 'Reaction removed successfully.', thought });
    } catch (error) {
      handleServerError(error, res);
    }
  },
};

module.exports = reactionController;
