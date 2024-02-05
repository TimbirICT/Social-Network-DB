const router = require('express').Router();
const {
  createReaction,
  removeReaction, 
} = require('../../controllers/reactionController');

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction); 

  module.exports = router;
