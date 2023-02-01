const { Thought, User, Reaction } = require("../models");

// an aggregate function to get the number of users overall
const thoughtCount = async () =>
  Thought.aggregate()
    .count("numberOfThoughts")
    .then((numberOfThoughts) => numberOfThoughts);

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    await Thought.find({})
      .select("-__v")
      .sort({ createdAt: "descending" })
      // .then((thoughts) => {
      //   !thoughts
      //     ? res.status(404).json({ message: "No thoughts" })
      //     : res.status(200).json(thoughts)
      // })
      .then(async (thoughts) => {
        if (!thoughts) {
          return res.status(404).json({ message: "No thoughts" });
        }
        const allThoughts = {
          thoughtCount: await thoughtCount(),
          ...thoughts
        };
        return res.status(200).json(allThoughts);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  async getSingleThought(req, res) {
    await Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  async createThought(req, res) {
    await Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          // new thought, no duplication so push it onto the user thought list
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought
  async deleteThought(req, res) {
    await Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "No thought with that ID" });
        }
        return User.findOneAndUpdate(
          { username: thought.username },
          { $pull: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created but couldn't find the user ID(?)"
            })
          : res.status(200).json({ message: "Thought successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  async updateThought(req, res) {
    await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add an reaction to a user
  async addReaction(req, res) {
    await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $push: {
          reactions: {
            reactionBody: req.body.reactionBody,
            username: req.body.username
          }
        }
      },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove reaction from a thought
  async removeReaction(req, res) {
    await Thought.findOneAndUpdate(
      { _id: req.params.ThoughtId },
      {
        $pull: {
          reactions: {
            reactionId: req.params.reactionId
          }
        }
      },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  }
};
