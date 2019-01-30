'use strict';

const db = require('../db');
const { User, Emotion } = require('../models/index');

async function seed() {
  await db.sync({ force: true });
  console.log('Database synchronization complete.');

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      tokenId:
        'e7e4ba5ae83aac1e6296347c415a58e5ceeadc1a71e26ff947d770bbfea32b6f',
    }),
    User.create({ email: 'ydoc@email.com', password: '321', tokenId: 2 }),
  ]);

  const emotions = await Promise.all([
    Emotion.create({
      url: 'google.com',
      anger: '0',
      contempt: '0',
      disgust: '0',
      fear: '0.12',
      happiness: '0.8',
      neutral: '0.002',
      sadness: '0.01',
      surprise: '0.068',
      userId: 1,
    }),
    Emotion.create({
      url: 'yahoo.com',
      anger: '1',
      contempt: '0',
      disgust: '0',
      fear: '0',
      happiness: '0',
      neutral: '0',
      sadness: '0',
      surprise: '0',
      userId: 2,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${emotions.length} users`);
  console.log('seed complete');
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (error) {
    console.error(error);
  } finally {
    console.log('closing database connection');
    await db.close();
    console.log('connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
