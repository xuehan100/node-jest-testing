
let DAO = require('../services/DAO').DAO; // looks like this is not needed here! 
let DB = require('../services/dbTest').DBTest;
var Status = require('../models/status').Status;
var db;

beforeEach(() => {
    db = new DB("/home/data/userDB.db");
});

test('Can get users from DB', () => {

    /* db.getAllUsers(function(users) { 
      // ...this will work too...
    }); */
    // if we return a promise, we don't need done();
    return db.getAllUsers().then((users) => {
        expect(users).toContainEqual({
            username: 'Anton',
            password: 'abc123',
            status: Status.OK
        });
        expect(users).toContainEqual({
            username: 'Shumin',
            password: 'xyz567',
            status: Status.OK
        });
        expect(users).toContainEqual({
            username: 'Ritvik',
            password: 'def012',
            status: Status.HELP
        });
    });
});

test('Can find user in DB', () => {
    return db.findUserByUsername('Shumin').then((user) => {
        expect(user.username).toEqual('Shumin');
    });
});

test('Can add users to DB', () => {
    let hakan = { username: 'Hakan', password: 'xyz567', status: Status.OK };
    return db.addUser(hakan).then(() => {
        db.findUserByUsername(hakan.username).then((user) => {
            expect(user.username).toEqual(hakan.username);
        })
    });
});

