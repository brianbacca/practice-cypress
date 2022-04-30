const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/server');
const { verify } = require('../../src/utils/jwt');
const { createUser, findUserByEmail } = require('../../src/data/user-data');
const { connectDb, createUri, closeDb } = require('../../src/db/mongo');

beforeAll(async () => {
  const uri = await createUri();
  await connectDb({ uri: uri });
});

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await closeDb;
});

describe('auth integration test', () => {
  test('succes signin', async () => {
    const email = 'brian@gmail.com';
    const password = '123456';

    const response = await request(app)
      .post('/signin')
      .send({
        email: 'brian@gmail.com',
        password,
      })
      .expect(200);

    const user = await findUserByEmail({ email });
    expect(response.body.message).toBe('success');
    expect(user.email).toBe(email);
    expect(user.password).not.toBe(password);
  });

  test('required email and password field', async () => {
    const response = await request(app).post('/signin').expect(400);
    expect(response.body).toEqual({
      message: 'email and password are required',
    });
  });

  test('validate if email alredy exists', async () => {
    const email = 'brian@gmail.com';
    const password = '123456';
    await createUser({ email, password });
    const response = await request(app)
      .post('/signin')
      .send({
        email: email,
        password: password,
      })
      .expect(400);
    expect(response.body).toEqual({
      message: 'User already exists',
    });
  });

  test('success login', async () => {
    const email = 'brian@gmail.com';
    const password = '123456';
    await createUser({ email, password });
    const response = await request(app)
      .post('/login')
      .send({
        email,
        password,
      })
      .expect(200);
    const decode = verify(response.body.token);

    expect(decode.email).toEqual(email);
  });

  test('required email and password field for loin', async () => {
    const response = await request(app).post('/login').expect(400);
    expect(response.body).toEqual({
      message: 'Email and password are required',
    });
  });

  test('validate if email already exists on login', async () => {
    const email = 'brian@gmail.com';
    const password = '123456';

    const response = await request(app)
      .post('/login')
      .send({
        email,
        password,
      })
      .expect(400);

    expect(response.body).toEqual({
      message: 'Email or password incorrect',
    });
  });
  test('validate if password is correct on login', async () => {
    const email = 'brian@gmail.com';
    const password = '123456';
    await createUser({ email, password });
    const response = await request(app)
      .post('/login')
      .send({
        email,
        password: 'incorrectPassword',
      })
      .expect(400);
    expect(response.body).toEqual({
      message: 'Email or password incorrect',
    });
  });
  test('valdiate protected endpoint contains Authorizarion header', async () => {
    const response = await request(app).get('/products').expect(403);
    expect(response.body).toEqual({
      message: 'The Authorization header was not sent',
    });
  });
  test('validate proyected endpoint valid bearer', async () => {
    const response = await request(app)
      .get('/products')
      .set('Authorization', 'foo')
      .expect(403);
    expect(response.body).toEqual({
      message: 'The Authorization header does not contain Bearer',
    });
  });
  test('validate proyected endpoint valid token', async () => {
    const response = await request(app)
      .get('/products')
      .set('Authorization', 'Bearer invalidToken')
      .expect(401);
    expect(response.body).toEqual({
      message: 'Invalid token authentication',
    });
  });
});
