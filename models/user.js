var DAO = require('../services/dao').DAO;

class User {

    constructor(username, password, status) {
        if (!User.validateUsername(username)) throw "invalid username";
        if (!User.validatePassword(password)) throw "invalid password";
        this.username = username;
        this.status = status;
        this.password = password;
    }

    static get reservedUsernames() {
        return ["about", "access", "account", "accounts", "add", "address", "adm", "admin"];
    }

    static get passwordMinLength() {
        return 4;
    }

    static get userNameMinLength() {
        return 3;
    }

    static validateUsername(username) {
        if (this.reservedUsernames.indexOf(username) > -1) {
            return false
        }
        if (username.length < this.userNameMinLength) {
            return false
        }
        return true
    }

    static validatePassword(password) {
        if (password.length < this.passwordMinLength) {
            return false;
        }
        return true;
    }

    static get dao() {
        return DAO;
    }

    static filter(users, status) {
        var filteredUsers = users.filter((elem) => {
            return elem.status == status;
        });
        return filteredUsers;
    }

    save() {
        return User.dao.addUser({
            username: this.username,
            password: this.password,
            status: this.status
        });
    }

    static retrieve(username) {
        return User.dao.findUserByUsername(username);
    }

    static all() {
        return User.dao.getAllUsers();
    }

}

exports.User = User;