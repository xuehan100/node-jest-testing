
let _DB = null;

class DAO {

    constructor() {

    }

    static set db(_db) {
        _DB = _db;
    }

    static get db() {
        return _DB;
    }

    static getAllUsers() {
        return DAO.db.getAllUsers();
    }

    static findUserByUsername(username) {
        return DAO.db.findUserByUsername(username);
    }

    static addUser(user) {
        return DAO.db.addUser(user);
    }

}

exports.DAO = DAO;
