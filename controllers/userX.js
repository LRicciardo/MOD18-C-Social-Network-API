// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');




// An aggregate function to get the number of users overall
const userCount = async () =>
  User.aggregate()
    .count("numberOfUsers")
    .then((numberOfUsers) => numberOfUsers);

const controller = {

  // getUsers() method for getting all users and populating the thoughts and friends arrays
  async getUsers (req, res) {
    await User.find({})
      .select('-__v')
      // .populate([{
      //     path: "thoughts",
      //     select: "-__v",},
      //     {
      //     path: "friends",
      //     select: "-__v",
      //     }])
      .then((users) => {
        const allUsers = {
          userCount: userCount(),
          users
         }
         return res.json(allUsers);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      }); 
},

  // Get a single user
  async getSingleUser(req, res) {
    await User.findOne({
        _id: req.params.userId
       })
      .select('-__v')
      .populate([{
          path: "thoughts",
          select: "-__v",},
          {
          path: "friends",
          select: "-__v",
          }])
    .then((user) => {
      if (!user) {
        res.status(404)
          .json({ message: 'No user with that ID' })
        }
      const userData = {
          friendCount: friendCount(),
          thoughtCount: thoughtCount(),
          user
      }
      return res.json(userData);
    })               
    .catch ((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
},
// create a new user 
// A new user has no thoughts, friends, or reactions
async createUser(req, res) {
 
  await User.create(req.body)
    .then((user) => res.status(200).json(user))
    .catch ((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
},

// Simple Delete
// Delete a user and remove user thoughts
// async deleteUser(req, res) {
// // find user 
//   getSingleUser({
//     _id: req.params.userId
//    })
//     .then((user) => {
//     if (!user) {
//       res.status(404)
//         .json({ message: 'No user with that ID' })
//       }
      
//       //  delete thoughts
//       for (thought in user.thoughts)
//           // deleteThought
//     )
    //  find reaction 
    //  remove reaction from thought's reaction array
    //  find friends
    //  remover user from friend's friend array

    // .then((thought) =>
    //   !thought
    //     ? res.status(404).json({
    //         message: 'User deleted, but no thoughts found',
    //       })
    //     : res.json({ message: 'User successfully deleted' })
    // )
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// }},

// // Add an reaction to a user
// addReaction(req, res) {
//   console.log('You are adding a reaction');
//   console.log(req.body);
//   User.findOneAndUpdate(
//     { _id: req.params.userId },
//     { $addToSet: { reactions: req.body } },
//     { runValidators: true, new: true }
//   )
//     .then((user) =>
//       !user
//         ? res
//             .status(404)
//             .json({ message: 'No user found with that ID :(' })
//         : res.json(user)
//     )
//     .catch((err) => res.status(500).json(err));
// },
// // Remove reaction from a user
// removeReaction(req, res) {
//   User.findOneAndUpdate(
//     { _id: req.params.userId },
//     { $pull: { reaction: { reactionId: req.params.reactionId } } },
//     { runValidators: true, new: true }
//   )
//     .then((user) =>
//       !user
//         ? res
//             .status(404)
//             .json({ message: 'No user found with that ID :(' })
//         : res.json(user)
//     )
//     .catch((err) => res.status(500).json(err));
// },

} //end constructor functions for users
module.exports = controller;
