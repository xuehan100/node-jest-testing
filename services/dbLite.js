var Status = require('../models/status').Status;

class DBLite {

    constructor() {
        this.users = [];
        this.users.push({
            username: 'Anton',
            password: 'abc123',
            status: Status.OK
        });
        this.users.push({
            username: 'Shumin',
            password: 'xyz567',
            status: Status.OK
        });
        this.users.push({
            username: 'Ritvik',
            password: 'def012',
            status: Status.HELP
        });
        this.delay = 0; // will behave like synchronous
    }

    getAllUsers(cb) {
        // the following is necessary to hoist the value inside the callbacks
        // otherwise this.users will be undefined inside setTimeout
        let users = this.users, delay = this.delay;
        return new Promise((resolve) => {
            setTimeout(function () {
                if (cb) {
                    cb(users);
                }
                resolve(users);
            }, delay);
        });
    }

    findUserByUsername(username, cb) {
        let user = this.users.find((u) => u.username === username);
        let delay = this.delay;
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                if (cb) {
                    cb(user);
                }
                if (!user) {
                    reject("User not found!");
                } else {
                    resolve(user);
                }
            }, delay);
        });
    }

    addUser(user, cb) {
        let users = this.users; // these are necessary for hoisting inside callback
        let exists = users.find((u) => u.username === user.username);
        let delay = this.delay;
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                if (exists) {
                    reject(exists);
                } else {
                    users.push(user);
                    if (cb) {
                        cb();
                    }
                    resolve();
                }
            }, delay);
        });
    }

}

exports.DBLite = DBLite;
