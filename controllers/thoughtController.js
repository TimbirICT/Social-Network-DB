const { Thought, User } = require("../models");
const { handleServerError } = require("../utils/errorHandling");

const thoughtController = {
  // GET /api/thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (error) {
      handleServerError(error, res);
    }
  },

  // GET /api/thoughts/:thoughtId
  getSingleThought: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId).populate(
        "reactions"
      );
      if (!thought) {
        return res.status(404).json({ error: "Thought not found." });
      }
      res.status(200).json(thought);
    } catch (error) {
      handleServerError(error, res);
    }
  },

  // POST /api/thoughts
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      // Update the associated user's thoughts array
      const user = await User.findByIdAndUpdate(thought.userId, {
        $push: { thoughts: thought._id },
      });
      res.status(201).json({ thought, user });
    } catch (error) {
      handleServerError(error, res);
    }
  },

  // PUT /api/thoughts/:thoughtId
  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ error: "Thought not found." });
      }
      res.status(200).json(thought);
    } catch (error) {
      handleServerError(error, res);
    }
  },

  // DELETE /api/thoughts/:thoughtId
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ error: "Thought not found." });
      }
      // Remove the thought ID from the associated user's thoughts array
      await User.findByIdAndUpdate(thought.userId, {
        $pull: { thoughts: thought._id },
      });
      res
        .status(200)
        .json({ message: "Thought deleted successfully.", thought });
    } catch (error) {
      handleServerError(error, res);
    }
  },
  createReaction: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;
  
      const thought = await Thought.findById(thoughtId);
  
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found.' });
      }
  
      // Push the entire reaction object into the thought's reactions array
      thought.reactions.push({ reactionBody, username });
  
      // Save the thought with the updated reactions array
      await thought.save();
  
      res.status(201).json({ message: 'Reaction added successfully.', thought });
    } catch (error) {
      handleServerError(error, res);
    }
  },
  

  // DELETE /api/thoughts/:thoughtId/reactions
  deleteReaction: async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;

      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ error: "Thought not found." });
      }

      thought.reactions = thought.reactions.filter(
        (reaction) => reaction._id.toString() !== reactionId
      );
      await thought.save();

      res
        .status(200)
        .json({ message: "Reaction removed successfully.", thought });
    } catch (error) {
      handleServerError(error, res);
    }
  },
};

module.exports = thoughtController;
