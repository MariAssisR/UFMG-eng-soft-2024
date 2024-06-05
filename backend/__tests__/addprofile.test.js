// tests/addProfileController.test.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { AddProfileController } = require('../controllers/AddProfileController');
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

test('AddProfileController should add a new profile', async () => {
  const body = { name: 'Test User', uid: '12345', photo: 'http://example.com/photo.jpg', kids: true };

  const newProfile = await AddProfileController(body);

  expect(newProfile).toHaveProperty('_id');
  expect(newProfile.name).toBe('Test User');
  expect(newProfile.uid).toBe('12345');
  expect(newProfile.photo).toBe('http://example.com/photo.jpg');
  expect(newProfile.kids).toBe(true);
});

test('AddProfileController should throw an error if uid is missing', async () => {
  const body = { name: 'Test User', photo: 'http://example.com/photo.jpg', kids: true };

  await expect(AddProfileController(body)).rejects.toThrow('Missing profile fields');
});

test('AddProfileController should throw an error if name is missing', async () => {
  const body = { uid: '12345', photo: 'http://example.com/photo.jpg', kids: true };

  await expect(AddProfileController(body)).rejects.toThrow('Missing profile fields');
});
