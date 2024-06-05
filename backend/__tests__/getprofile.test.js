// tests/getProfileController.test.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { GetProfileController } = require('../controllers/GetProfileController');
const { ProfileModel } = require('../models/Profile');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await ProfileModel.deleteMany({});
});

test('GetProfileController should retrieve profiles by uid', async () => {
  const profileData = { name: 'Test User', uid: '12345', photo: 'http://example.com/photo.jpg', kids: true };
  await ProfileModel.create(profileData);

  const profiles = await GetProfileController({ uid: '12345' });

  expect(profiles).toHaveLength(1);
  expect(profiles[0].name).toBe('Test User');
  expect(profiles[0].uid).toBe('12345');
  expect(profiles[0].photo).toBe('http://example.com/photo.jpg');
  expect(profiles[0].kids).toBe(true);
});
