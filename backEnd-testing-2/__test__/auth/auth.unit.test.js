const request = require('supertest');
const app = require('../../src/app');
const { findUserByEmail } = require('../../src/data/user-data');
jest.mock('../../src/data/user-data.js');
describe('auth unit test', () => {
  test('response with frendly message an error exception', async () => {
    findUserByEmail.mockImplementationOnce(() => {
      throw new Error('test pass');
    });

    const response = await request(app)
      .post('/signin')
      .send({
        email: 'brianbn@gmaill.com',
        password: '123456',
      })
      .expect(500);

    expect(response.body).toEqual({ message: 'There was an unexpected error' });
  });
});
