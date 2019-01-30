'use strict';

const db = require('../db');
const { User, Emotion } = require('../models/index');

async function seed() {
  await db.sync({ force: true });
  console.log('Database synchronization complete.');

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123', tokenId: 1 }),
    User.create({ email: 'ydoc@email.com', password: '321', tokenId: 2 }),
  ]);

  const emotions = await Promise.all([
    Emotion.create({
      url: 'google.com',
      angerScore: '0',
      contemptScore: '0',
      disgustScore: '0',
      fearScore: '0.12',
      happinessScore: '0.8',
      neutralScore: '0.002',
      sadnessScore: '0.01',
      surpriseScore: '0.068',
      userId: 1,
    }),
    Emotion.create({
      url: 'yahoo.com',
      angerScore: '1',
      contemptScore: '0',
      disgustScore: '0',
      fearScore: '0',
      happinessScore: '0',
      neutralScore: '0',
      sadnessScore: '0',
      surpriseScore: '0',
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
