const { User } = require("../models");

const friendController = {
  // POST /api/users/:userId/friends/:friendId
  addFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;

      // Check if both user and friend exist
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);

      if (!user || !friend) {
        return res.status(404).json({ error: "User or friend not found." });
      }

      // Check if friend is already in the user's friend list
      if (user.friends.includes(friendId)) {
        return res.status(400).json({ error: "Friend already added." });
      }

      // Add friend to user's friend list
      user.friends.push(friendId);
      await user.save();

      res.status(200).json({ message: "Friend added successfully.", user });
    } catch (error) {
      handleServerError(error, res);
    }
  },

  // DELETE /api/users/:userId/friends/:friendId
  removeFriend: async (req, res) => {
    try {
      const { userId, friendId } = req.params;

      // Check if both user and friend exist
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);

      if (!user || !friend) {
        return res.status(404).json({ error: "User or friend not found." });
      }

      // Check if friend is in the user's friend list
      if (!user.friends.includes(friendId)) {
        return res
          .status(400)
          .json({ error: "Friend not found in the friend list." });
      }

      // Remove friend from user's friend list
      user.friends = user.friends.filter(
        (friend) => friend.toString() !== friendId
      );
      await user.save();

      res.status(200).json({ message: "Friend removed successfully.", user });
    } catch (error) {
      handleServerError(error, res);
    }
  },
};

module.exports = friendController;
