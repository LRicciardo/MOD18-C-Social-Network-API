// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

// an aggregate function to get the number of users overall
const userCount = async () =>
  User.aggregate()
    .count("numberOfUsers")
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
  // Get all users
  async getUsers(req, res) {
    await User.find({})
      .select("-__v")
      .populate([
        {
          path: "thoughts",
          select: "-__v"
        },
        {
          path: "friends",
          select: "-__v"
        }
      ])
      .then(async (users) => {
        const allUsers = {
          userCount: await userCount(),
          ...users
        };
        return res.json(allUsers);
      })
      .catch((err) =>  res.status(500).json(err));
  },
  // Get a single user
  async getSingleUser(req, res) {
    await User.findOne({
      _id: req.params.userId
    })
      .select("-__v")
      .populate([
        {
          path: "thoughts",
          select: "-__v"
        },
        {
          path: "friends",
          select: "-__v"
        }
      ])
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID" });
        }
        return res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  async createUser(req, res) {
    await User.create({
      username: req.body.username,
      email: req.body.email
    })
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user and remove them from the thought
  async updateSingleUser(req, res) {
    await User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        username: req.body.username,
        email: req.body.email
      },
      { runValidators: true, new: true }
    )
      .select("-__v")
      .populate([
        {
          path: "thoughts",
          select: "-__v"
        },
        {
          path: "friends",
          select: "-__v"
        }
      ])
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists" })
          // : res.status(200).json({ message: "User successfully updated" })
          : res.status(200).json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a user and remove them from the thought
  async deleteUser(req, res) {
    await User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No such user exists" });
        }
        return Thought.deleteMany({
          _id: {
            $in: user.thoughts
          }
        });
      })
      .then((thought) =>
        !thought
          ? res
              .status(250)
              .json({ message: "User deleted, but no thoughts found" })
          : res.status(200).json({
              message: "User and associated thoughts successfully deleted"
            })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an friend to a user
  async addFriend(req, res) {
    await User.findOneAndUpdate(
      { _id: req.params.userId },
      // add the friend to the user friends array
      // (addToSet will not add if already in array)
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User found with that id" })
          // : res.status(200).json({ message: "Friend added to User" })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove friend from a user
  async removeFriend(req, res) {
    await User.findOneAndUpdate(
      { _id: req.params.userId },
      // pull the friend to the user friends array
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .select("-__v")
      .populate([
        {
          path: "thoughts",
          select: "-__v"
        },
        {
          path: "friends",
          select: "-__v"
        }
      ])
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User found with that id" })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  }
};
