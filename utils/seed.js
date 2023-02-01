const connection = require('../config/connection');
// const cTable = require('console.table');
const { Thought, User, Reaction } = require('../models');
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
  console.log('============ thoughts deleted ==========================');
  
  // Drop existing users
  await User.deleteMany({});
  console.log('============ users deleted ==========================');
  
  // seed all users
  // Create empty array to hold the users
  let users = [];
  // Create empty array to hold the thoughts
  let thoughts = [];
  
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
  console.log('============ users inserted ==========================');
  
  // seed all thoughts
  // Create an array of users
  // users = await User.find({});

  // // add 5 thoughts to the thoughts array for each user
  // //  for each user
  // for (let u = 0; u < users.length; u++) {
  //   const username = users[u].username;
  //   const userId = users[u]._id;
  //   console.log('userId');
     
  //   // for each thought
  //   for(let t = 0; t < 2; t++) {
  //     // create random thought
  //     const  thoughtText = `(${getRandomNumber(99)}) ${getRandomThought()}`;
      
  //     thoughts.push({
  //       thoughtText: thoughtText,
  //       username: username,
  //     });

  //   }  // end of thought for loop
  //   let result = []
  //   await Thought.collection.insertMany(thoughts);
  //   thoughts = await Thought.find({});
  //   console.log('============ thoughts begin ==========================');
  //   console.log(thoughts);
  //   console.log('============  thoughts end  ==========================');
  //   for(let t = 0; t < thoughts.length; t++) {
  //     result.push(thoughts[t]._id)
  //   }
  //   console.log('============ results begin ==========================');
  //   console.log(result);
  //   console.log('============  results end  ==========================');
    
  //   await User.collection.updateOne(          
  //   { username: username },
  //         { $push: { thoughts: result } },
  //         { new: true });  
  // }  // end of users loop
  


  // Log out the seed data to indicate what should appear in the database
  // console.log(users);
  // console.log(thoughts);
  // console.table(users);
  // console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});