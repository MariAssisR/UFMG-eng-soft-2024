// tests/addUserController.test.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { AddUserController } = require('../controllers/AddUserController');
const { UserModel } = require('../models/User');

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
  await UserModel.deleteMany({});
});

test('AddUserController should add a new user', async () => {
  const userData = { name: 'Test User', uid: '12345' };

  const newUser = await AddUserController(userData);

  expect(newUser).toHaveProperty('_id');
  expect(newUser.name).toBe('Test User');
  expect(newUser.uid).toBe('12345');
});

test('AddUserController should throw an error if uid is missing', async () => {
  const userData = { name: 'Test User' };

  await expect(AddUserController(userData)).rejects.toThrow('Missing task fields');
});

test('AddUserController should throw an error if name is missing', async () => {
  const userData = { uid: '12345' };

  await expect(AddUserController(userData)).rejects.toThrow('Missing task fields');
});
