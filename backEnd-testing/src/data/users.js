const users = [];

module.exports.getUsers = () => {
  return users;
};
module.exports.addUser = ({ name, address, age, uid }) => {
  users.push({ name, address, age, uid });
};

module.exports.findUserByUid = ({ uid }) => {
  return users.find(({ uid: userUid }) => userUid === uid);
};

module.exports.updateUserByUid = ({ uid, name, address, age }) => {
  const userUpdate = users.map((user) => {
    if (user.uid === uid) {
      return {
        ...user,
        name,
        address,
        age,
      };
    }
    return user;
  });
  return userUpdate;
};

module.exports.removeUserByUid = ({ uid }) => {
  return users.filter(({ uid: userUid }) => userUid !== uid);
};
