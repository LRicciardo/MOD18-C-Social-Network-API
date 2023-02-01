const usersArr = [
  { username: 'ASmith', email: 'ASmith@gmail.com' },
  { username: 'AJohnson', email: 'AJohnson@yahoo.com' },
  { username: 'AWilliams', email: 'AWilliams@hotmail.com' },
  { username: 'ABrown', email: 'ABrown@outlook.com' },
  { username: 'AJones', email: 'AJones@company.org' },
  { username: 'AGarcia', email: 'AGarcia@school.edu' },
  { username: 'CMiller', email: 'CMiller@bureaucracy.gov' },
  { username: 'CDavis', email: 'CDavis@network.net' },
  { username: 'FRodriguez', email: 'FRodriguez@military.mil' },
  { username: 'GMartinez', email: 'GMartinez@domain.co' },
  { username: 'GHernandez', email: 'GHernandez@thebighouse.us' },
  { username: 'JLopez', email: 'JLopez@mailings.post' },
  { username: 'JGonzalez', email: 'JGonzalez@techblog.blog' },
  { username: 'KWilson', email: 'KWilson@gmail.com' },
  { username: 'MAnderson', email: 'MAnderson@yahoo.com' },
  { username: 'NThomas', email: 'NThomas@hotmail.com' },
  { username: 'PTaylor', email: 'PTaylor@outlook.com' },
  { username: 'SMoore', email: 'SMoore@company.org' },
  { username: 'SJackson', email: 'SJackson@school.edu' },
  { username: 'SMartin', email: 'SMartin@bureaucracy.gov' },
  { username: 'TLee', email: 'TLee@network.net' },
  { username: 'TPerez', email: 'TPerez@military.mil' },
  { username: 'VThompson', email: 'VThompson@domain.co' },
  { username: 'XWhite', email: 'XWhite@thebighouse.us' },
  { username: 'ZHarris', email: 'ZHarris@mailings.post' },
];

const emailEndings = [
  '@gmail.com',
  '@yahoo.com',
  '@hotmail.com',
  '@outlook.com',
  '@hotmail.co.uk',
  '@yahoo.co.uk',
  '@outlook.co.uk',
  '@company.org',
  '@school.edu',
  '@bureaucracy.gov',
  '@network.net',
  '@military.mil',
  '@domain.co',
  '@thebighouse.us',
  '@mailings.post',
  '@techblog.blog',
];

const thoughtDescriptions = [
  'I have an idea!',
  ' Cavemen don\'t need brains, we have these ( shows off his boxing stance and throws a few punches ). Yeah! That\'s what I\'m talking about! Ideas are for weaklings.',
  'Tonight, we\'ll hear the story of Crispy Bear. A long time ago, this bear was alive because she listened to her father, so she was happy, but Crispy had one terrible problem. She was filled with....curiosity! Yes! and one day she saw something new, and died!',
  'If Grug Had An Idea Of His Own I Will Have An Heart Attack And DIE!!!!!!!',
  'This is called a brain. I think that\'s where ideas come from.',
  'I did not see that coming. Twist ending!',
  'Can I keep him?!',
  'Find a need. Fill a need.',
  'Never try, never fail. Those are the words I live by. Wait! Is that right?',
];

const reactionDescriptions = [
  'What a cool thought',
  'I never thought of it like that',
  'What a great idea',
  'Interesting',
  'Mind blowing',
  'Little idea. Think Bigger!',
  'Man What were you thing!',
  'Hello world',
  'I need to rethink this',
  'Broaden that idea. You\'re on to something!',
  'I heard of this.',
  'This is a great idea',
  'Simple yet complex',
  'WoW! Just ... Wow!',
  'I thought of this but you did it.',
];

// Get a random item given an array
const getRandomNumber = (nbr) => Math.floor(Math.random() * nbr);

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getUsersArr = () => usersArr;

// Gets a random full name
const getRandomThought = () =>
  `${getRandomArrItem(thoughtDescriptions)}`;

  // Gets a random full name
const getRandomEmailEnding = () =>
  `${getRandomArrItem(emailEndings)}`;

// Function to generate random assignments that we can add to student object.
const getRandomReaction = () => {
  `${getRandomArrItem(reactionDescriptions)}`;
};

// Export the functions for use in seed.js
module.exports = { 
  getUsersArr, 
  getRandomThought, 
  getRandomReaction, 
  getRandomEmailEnding,
  getRandomArrItem, 
  getRandomNumber };
