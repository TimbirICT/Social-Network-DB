const router = require('express').Router();
const {
  createReaction,
  removeReaction, // Make sure this method is correctly referenced
} = require('../../controllers/reactionController');

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction); // Ensure correct method reference

module.exports = router;
