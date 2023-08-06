const connection = require('../config/connection');
const { User, Thoughts } = require('../models');

connection.on('error', err => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist

  let usersCheck = await connection.db
    .listCollections({ name: 'users' })
    .toArray();
  if (usersCheck.length) {
    await connection.dropCollection('users');
  }

  // Create empty array to hold the students
  const users = [];
  const thoughts = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 5; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data

    users.push({
      username: `user${i}`,
      email: `user${i}@email.com`,
      thoughts: [],
    });

    thoughts.push({
      thoughtText: `I am #${i}`,
      username: `user${i}`,
      reactions: [],
    });
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(users);
  await Thoughts.collection.insertMany(thoughts);

  // Add courses to the collection and await the results

  // Log out the seed data to indicate what should appear in the database
  console.table(users, thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
