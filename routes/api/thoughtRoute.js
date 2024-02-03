// routes/api/thoughtRoute.js

const router = require('express').Router();
const thoughtController = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
  .get(thoughtController.getAllThoughts)
  .post(thoughtController.createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(thoughtController.getSingleThought)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(thoughtController.createReaction)
  .delete(thoughtController.deleteReaction);
  
module.exports = router;
