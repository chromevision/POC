'use strict';

const db = require('../db');
const { User, Emotion } = require('../models/index');

async function seed() {
  await db.sync({ force: true });
  console.log('Database synchronization complete.');

  const users = await Promise.all([
    User.create({
      email: 'joseph@email.com',
      password: '123',
      tokenId:
        '4cc2b8a24fe082de8ea4ced09af2c9d22467a5c3799bda4da4c8ed5059c38c',
    }),
    User.create({
      email: 'stephen@email.com',
      password: '321',
      tokenId: '3ce0c3bd839d10e849d54d4422104ee521f39effe3c4d9f925ed292434364f',
    }),
    User.create({
      email: 'preet@email.com',
      password: '1234',
      tokenId:
        '3b56b089b21077b46971a5c33e1cf718d68c3d4ddd7f129d123ffe7f9f011ab',
    }),
    User.create({
      email: 'sanjeev@email.com',
      password: '4321',
      tokenId: 'd19c8d2f61d45395f1d897faf33d35ec97e9a021509cdb3614c7bc4c4fb27b',
    }),
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
      userTokenId:
        '4cc2b8a24fe082de8ea4ced09af2c9d22467a5c3799bda4da4c8ed5059c38c',
    }),
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
      userTokenId:
        '3ce0c3bd839d10e849d54d4422104ee521f39effe3c4d9f925ed292434364f',
    }),
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
      userTokenId:
        '3b56b089b21077b46971a5c33e1cf718d68c3d4ddd7f129d123ffe7f9f011ab',
    }),
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
      userTokenId:
        'd19c8d2f61d45395f1d897faf33d35ec97e9a021509cdb3614c7bc4c4fb27b',
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
      userTokenId: '2',
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
