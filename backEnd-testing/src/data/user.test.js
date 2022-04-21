const {
  getUsers,
  addUser,
  findUserByUid,
  updateUserByUid,
  removeUserByUid,
} = require('./users');

const { buildUser } = require('../__fixture__/users');

test('should add new user', () => {
  const user = buildUser();
  addUser(user);
  expect(getUsers()).toEqual([user]);
});
test('findUserByUid -  should return undefined when there are no users', () => {
  const user = findUserByUid({ uid: '' });

  expect(user).toBe(undefined);
});

test('findUserByUid - should return a valid user', () => {
  const user = buildUser();
  const userFound = findUserByUid({ uid: user.uid });

  expect(userFound).toEqual(user);
});
test('updateUserByUid - should update a valid user', () => {
  const user = buildUser();
  const userUpdate = { ...user, name: 'new name' };
  const usersUpdate = updateUserByUid(userUpdate);

  expect(usersUpdate).toEqual([userUpdate]);
});
test('removeUserByUid - should update a valid user', () => {
  const user = buildUser();
  addUser(user);
  const usersUpdate = removeUserByUid({ uid: user.uid });

  expect(usersUpdate).toEqual([]);
});
