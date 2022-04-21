const request = require('supertest');
const app = require('./app');
const {
  getUsers,
  addUser,
  updateUserByUid,
  findUserByUid,
  removeUserByUid,
} = require('./data/users');
const { buildUser } = require('./__fixture__/users');

jest.mock('./data/users');

beforeEach(() => {
  getUsers.mockReset();
  addUser.mockReset();
  updateUserByUid.mockReset();
  findUserByUid.mockReset();
  removeUserByUid.mockReset();
});

describe('users', () => {
  it('should  store a user', async () => {
    const response = await request(app)
      .post('/users')
      .send(buildUser())
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      message: 'success',
    });
  });
  it('should  get all user', async () => {
    const user = buildUser();
    getUsers.mockReturnValue([user]);
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([user]);
  });
  it('should  get empty when there are no users', async () => {
    getUsers.mockReturnValue([]);
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should update an user', async () => {
    const user = buildUser();
    updateUserByUid.mockReturnValue([user]);
    const response = await request(app)
      .put(`/users/${user.uid}`)
      .send(user)
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([user]);
  });
  it('should get an user', async () => {
    const user = buildUser();
    findUserByUid.mockReturnValue(user);
    const response = await request(app).get(`/users/${user.uid}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(user);
  });
  it('should delete an user', async () => {
    const user = buildUser();
    removeUserByUid.mockReturnValue([]);
    const response = await request(app).delete(`/users/${user.uid}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});
