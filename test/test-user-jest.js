
let User = require('../models/user').User;
let DB = require('../services/dbLite').DBLite;
let DAO = require('../services/dao').DAO;
var Status = require('../models/status').Status;

test('Username should not be a stop word', () => {
  var isValid = User.validateUsername('admin');
  expect(isValid).toBe(false);
});

test('Should not create user with invalid username', () => {
  try {
    var newUser = new User('admin', 'xyz123', Status.OK);
    fail("erroneously valid username");
  } catch (err) {
    expect(err.message || err).toBe("invalid username");
  }
});

test('Should not create user with invalid password', () => {
  try {
    var newUser = new User('Wang', '123', Status.OK);
    fail("erroneously valid password");
  } catch (err) {
    expect(err.message || err).toBe("invalid password");
  }
});

test('Should not create user with multiple invalid credentials', () => {
  try {
    var newUser = new User('account', 'a0', Status.OK);
    fail("erroneously valid password");
  } catch (err) {
    expect(err.message || err).toBe("invalid username");
  }
});

test('Password should not be less than 4 chars', () => {
  var isValid = User.validatePassword('a');
  expect(isValid).not.toBe(true);
});

test('Username should not be less than 3 chars', () => {
  var isValid = User.validateUsername('a');
  expect(isValid).toBe(false);
});

test('It should be possible to filter users wrt emergency status', () => {
  var users = [
    { username: 'Anton', status: Status.OK },
    { username: 'Shumin', status: Status.OK },
    { username: 'Ritvik', status: Status.HELP }
  ];
  var expected = [{ username: 'Ritvik', status: Status.HELP }];
  var actual = User.filter(users, Status.HELP);
  // the comparison must be eql here for deep equality  
  expect(actual).toEqual(expected);
});

test('It should be possible to save a new user', () => {
  DAO.db = new DB();
  let hakan = new User('Hakan', 'xyz567', Status.OK);
  return hakan.save().then(() => {
    DAO.db.findUserByUsername(hakan.username).then((user) => {
      expect(user.username).toBe(hakan.username);
    })
  });
});

test('It should not be possible to save an existing user', () => {
  DAO.db = new DB();
  let shumin = new User('Shumin', 'xyz567', Status.OK);
  return shumin.save().then(() => {
    fail(0, 0, "double saving of user");
  }, (err) => {
  });
});

test('It should be possible to retrieve an existing user by username', () => {
  DAO.db = new DB();
  return User.retrieve('Shumin').then((user) => {
    expect(user.username).toBe('Shumin');
  });
});

test('It should not be possible to retrive a non-existing user by username', () => {
  DAO.db = new DB();
  return User.retrieve('Hakan').then((user) => {
    fail(0, 0, "non-existing user retrieved");
  }, (err) => {
  });
});

