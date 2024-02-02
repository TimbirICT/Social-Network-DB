// controllers/userController.js

const { User } = require('../models');


const userController = {
  // GET /api/users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      handleServerError(error, res);
    }
  },

  // GET /api/users/:userId
  getSingleUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('thoughts friends');
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.status(200).json(user);
    } catch (error) {
      handleServerError(error, res);
    }
  },

  // POST /api/users
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      handleServerError(error, res);
    }
  },

  // PUT /api/users/:userId
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.status(200).json(user);
    } catch (error) {
      handleServerError(error, res);
    }
  },

  // DELETE /api/users/:userId
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.status(200).json({ message: 'User deleted successfully.', user });
    } catch (error) {
      handleServerError(error, res);
    }
  },
};

module.exports = userController;
