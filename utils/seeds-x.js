const connection = require('../config/connection');
const { Thought, User } = require('../models');
const {   getRandomName, 
  getRandomThought, 
  getRandomReaction, 
  getRandomEmailEnding,
  getRandomArrItem, 
  getRandomNumber } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  
  // seed all users
  // Create empty array to hold the users
  let users = [];
  // Create empty array to hold the thoughts
  let thoughts = [];
  const updateUsers = [];
  // Create empty array to hold the thoughts
  // const friends = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {

    const username = `${getRandomName()}${getRandomNumber(99)}`;
    const email = `${username}${getRandomEmailEnding()}`
    
    users.push({
      username: username,
      email: email
    });
  };
  
  // Add users to the collection and await the results
  await User.collection.insertMany(users);
  
  // seed all thoughts
  // Create an array of users
  usersData = await User.find({});
  // add 5 thoughts to the thoughts array for each user
  for (let i = 0; i < usersData.length; i++) {
    // empty array for each user
    const userId = usersData[i]._id;
    const friends = [];
     
    for(let j = 0; j < 5; j++) {
      // create thoughts
    const thoughtData = {
      thoughtText: `${getRandomNumber(99)} ${getRandomThought()}`,
      username: users[getRandomNumber(usersData.length)]._id,
      };
      thoughts.push(thoughtData);

      // add friends
      friends.push(users[getRandomNumber(usersData.length)]._id)
    }
      await User.findOneAndUpdate(
        {_id: userId,},
      { $addToSet: { friends: friends } },
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
       
  } 
  
  await Thought.collection.insertMany(thoughts);
  // await User.collection.updatetMany(updateUsers);
  
  // Create an updated array of users
  users = await User.find({});
  // Create an updated array of thoughts
  thoughts = await Thought.find({});
  for (let t = 0; t < thoughts.length; t++) {

  for (let r = 0; r < 5; r++) {
      await Thought.findOneAndUpdate(
        { _id: thoughts[t].thoughtId },
        { $addToSet: { reactions: {
          reactionBody: getRandomReaction(),
          username: users[getRandomNumber(users.length)].username,
         }}},
        { runValidators: true, new: true }
      );
    
    } // end of reaction for loop

    } // end of thoughts for loop
  

  // console.log(users)
  // console.log(thoughts)

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
