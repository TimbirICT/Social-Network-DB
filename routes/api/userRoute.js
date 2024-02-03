// routes/api/userRoute.js

const router = require('express').Router();
const userController = require('../../controllers/userController');

// /api/users
router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

// /api/users/:userId
router.route('/:userId')
  .get(userController.getSingleUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser); // Ensure this line has the deleteUser method

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(userController.addFriend)
  .delete(userController.removeFriend);

module.exports = router;
