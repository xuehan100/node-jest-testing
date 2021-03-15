var db = {
    query: function (queryString, cb) {
        cb(0, ["john", "jane"]);
    }
}

var getAllUsers = function () { // async w/ promise
    return new Promise((resolve, reject) => {
        let doUponGetAllUsers = (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        }
        db.query("SELECT * FROM USER_TABLE",
            doUponGetAllUsers); // async w/ callback
    });
}

promise = getAllUsers();
promise.then((users) => {
    console.log(users);
}, (err) => {
    console.log("No users found!");
});

