var Status = require('../models/status').Status;

DBLite = require('./dbLite').DBLite;

class DBTest extends DBLite {

    constructor(pathname) {
        super();
        this.init();
        this.connect(pathname, () => { console.log("connected"); });
        this.delay = 100; // will be asynchronous and slow, like a real DB
    }

    static get userTable() {
        return [
            { username: 'Anton', password: 'abc123', status: Status.OK },
            { username: 'Shumin', password: 'xyz567', status: Status.OK },
            { username: 'Ritvik', password: 'def012', status: Status.HELP },
            { username: 'Ali', password: 'klm324', status: Status.OK },
            { username: 'Serra', password: 'gij876', status: Status.OK },
            { username: 'Dimitris', password: 'hik888', status: Status.HELP }
        ];
    }

    init() {
        this.users = DBTest.userTable;
    }

    connect(pathname, ready) {
        // some code to connect to a real database
    }

}

exports.DBTest = DBTest;