// routes/api/reactions.js

const router = require('express').Router();
const reactionController = require('../../controllers/reactionController');

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(reactionController.createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(reactionController.removeReaction);

module.exports = router;
