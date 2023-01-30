const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Smith',
  'Jones',
  'Coollastname',
  'enter_name_here',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  'Xander',
  'Jared',
  'Courtney',
  'Gillian',
  'Clark',
  'Jared',
  'Grace',
  'Kelsey',
  'Tamar',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
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
  'Tonight, we\'ll hear the story of Crispy Bear. A long time ago, this bear was alive because she listened to her father, so she was happy, but Crispy had one terrible problem. She was filled with....curiosity! Yes! and one day she saw something new, and died!.',
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
const getRandomName = () =>
  `${getRandomArrItem(names).split()[0]}${getRandomArrItem(names)}`;

// Gets a random full name
const getRandomThought = () =>
  `${getRandomArrItem(thoughtDescriptions)}`;

  // Gets a random full name
const getRandomEmailEnding = () =>
  `${getRandomArrItem(emailEndings)}`;

// Function to generate random assignments that we can add to student object.
const getRandomReaction = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      ReactionName: getRandomArrItem(reactionDescriptions),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { 
  getRandomName, 
  getRandomThought, 
  getRandomReaction, 
  getRandomEmailEnding,
  getRandomArrItem, 
  getRandomNumber };
