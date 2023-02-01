# MOD18-C-Social-Network-API
Social Network API using Express.js, MongoDB, and Mongoose-ODM

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Creates the CRUD processes for a Social Network API using Express.js, MongoDB, and Mongoose-ODM

## Table of Contents
  
- [User Story](#userstory)
- [Acceptance Criteria](#acceptance-criteria)
- [API Routes](#api-routes)
- [Visual Documentation](#visual-documentation)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Feature](#features)
- [How to Contribute](#contribute)
- [How to Test](#test)
- [Contact Info](#contact) 

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```


### API Routes

**`/api/users`** 
* `GET` all users
* `GET` a single user by its `_id` and populated thought and friend data
* `POST` a new user:
```json
// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
```
* `PUT` to update a user by its `_id`
* `DELETE` to remove user by its `_id`
**BONUS**: Remove a user's associated thoughts when deleted.

---

**`/api/users/:userId/friends/:friendId`**
* `POST` to add a new friend to a user's friend list
* `DELETE` to remove a friend from a user's friend list

---

**`/api/thoughts`**
* `GET` to get all thoughts
* `GET` to get a single thought by its `_id`
* `POST` to create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
```json
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
```
* `PUT` to update a thought by its `_id`
* `DELETE` to remove a thought by its `_id`

---

**`/api/thoughts/:thoughtId/reactions`**
* `POST` to create a reaction stored in a single thought's `reactions` array field
* `DELETE` to pull and remove a reaction by the reaction's `reactionId` value

## Visual Documentation

The following video shows the application being used from Insomnia app:

DEMO video 1: The GET functions for Users and Thoughts collections.

[![A DEMO video 1: The GET functions for Users and Thought collections.](./assets/18-nosql-homework-demo-01.gif)](https://drive.google.com/file/d/1LQAs72pn20lpKHoluigqOqtGrxclS1Ak/view?usp=share_link)

***

A DEMO video 2: The GET by Id functions for Users and Thoughts collections.

[![A DEMO video 2: The GET by Id functions for Users and Thoughts collections.](./assets/18-nosql-homework-demo-02.gif)](https://drive.google.com/file/d/1wRF4tuG8EaMQY28gqqC9n_gDmT0Qt8Dv/view?usp=share_link)

***

A DEMO video 3: The POST, PUT and DELETE functions for Users and Thoughts collections.

[![A DEMO video 3: The POST, PUT and DELETE functions for Users and Thoughts collections.](./assets/18-nosql-homework-demo-03.gif)](https://drive.google.com/file/d/17lYjLqblaYK2iuG0fga-A8BtwFn4ZnDv/view?usp=share_link)

***

A DEMO video 4: The POST and DELETE functions for friends and Reactions subdocuments.

[![A DEMO video 3: The POST and DELETE functions for friends and Reactions subdocuments.](./assets/18-nosql-homework-demo-04.gif)](https://drive.google.com/file/d/1a88pvyDdRSpSQ4iwKXFlfm1tUmbzG9ni/view?usp=share_link)


## Installation

Initialize npm to produce the package.json file.
Type npm install to install the following: MongoDB, mongoose, express, dotenv, luxon.
 
In the command line, type npm start.
USES Insomnia to perform CRUD tasks


## Usage
- JavaScript with Node.js - base coding language
- express - to create the routers/endpoints
- dotenv - to hide the environmental variables (password/database)
- MongoDB package - as the database dialect
- mongoose - to interpret the database commands
- Insomnia app - to perform the CRUD functions to the database 

## Credits

I would like to thank my tutoring for helping me. (Though seeding gave me lots of trouble and I only seeded Users successfully. I want to look into npm mongo-seeding more.)

## License

This application is using the The MIT License License. Click on the badge  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  to follow the link to the license.

---

## Features



## How to Contribute

This application follows the [Contributor Covenant](https://www.contributor-covenant.org/).

If you would like to contribute it, you can create an issue on GitHub repository at https://github.com/LRicciardo/MOD18-C-Social-Network-API. 

## Tests


  
## Contact Info

This application follows the [Contributor Covenant](https://www.contributor-covenant.org/).

If you would like to contact me about an issue, you can send an email to Liane.Ricciardo@gmail.com.
