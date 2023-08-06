const connection = require('../config/connection');
const { User } = require('../models');
const { getRandomName } = require('./data');
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

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];

    users.push({
      first,
      last,
    });
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Add courses to the collection and await the results

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
