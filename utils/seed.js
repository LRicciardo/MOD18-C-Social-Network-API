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
  const users = [];
  // Create empty array to hold the thoughts
  const thoughts = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    
    const userData = {
      username: `${getRandomName()}${getRandomNumber(99)}`,
      email: `${userData.username}${getRandomEmailEnding()}`,
    }
   
    users.push(userData);


  };
  
  // Add users to the collection and await the results
  await User.collection.insertMany(users);
  
  // seed all thoughts
  // Create an array of users
  users = await User.find({});
  // add 5 thoughts to the thoughts array for each user
  for (let i = 0; i < users.length; i++) {
    // const thoughts = [];
     
    for(let j = 0; j < 5; j++) {

    const thoughtData = {
      thoughtText: `${getRandomNumber(99)} ${getRandomThought()}`,
      username: users[i]._id,
      reactions: [],
      };
      thoughts.push(thoughtData);
    }
  } 
  
  await Thought.collection.insertMany(thoughts);
  // Create an updated array of users
  users = await User.find({});
  console.log(users)
  // Create an updated array of thoughts
  thoughts = await Thought.find({});
  console.log(thoughts)

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
