const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  addFriend,
  updateSingleUser,
  deleteUser,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/')
  // GET Retrieves all users
  .get(getUsers)
  // POST Creates a new user
  .post(createUser);
  
  // /api/users/:userId
  router.route('/:userId')
  // GET Retrieves a single user ( include thoughts and friend )
  .get(getSingleUser)
  // PUT Updates a single user 
  .put(updateSingleUser)
  // DELETE removes a single user ( and associated thoughts )
  .delete(deleteUser);
  
  
  // /api/users/:userId/reactions/:reactionId
  router.route('/:userId/friends/:friendId')
  // POST Adds a current userid to a friends list
  .post(addFriend)
  // DELETE removes a single user from an friends list
  .delete(removeFriend);

module.exports = router;
