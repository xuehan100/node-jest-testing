var Status = require('../models/status').Status;


let express = require('express');
let router = express.Router();
let User = require('../models/user').User;

/* GET all users  */
router.get('/', function (req, res, next) {
  // example of handling async calls with callbacks
  User.all().then((users) => {
    res.status(200).json(users)
  });
});

/* GET all users with HELP status */
router.get('/emergency', function (req, res, next) {
  // example of handling async calls with callbacks
  User.all().then((users) => {
    return User.filter(users, Status.HELP)
  }).then((filteredUsers) => {
    res.status(200).json(filteredUsers)
  });
});

/* POST a new user */
router.post('/', function (req, res, next) {
  if (req.body === undefined) {
    res.statusMessage = "request body undefined";
    res.status(406).end();
  } else {
    let username = req.body.username;
    let password = req.body.password;
    let status = req.body.status;
    try {
      var newUser = new User(username, password, status);
    } catch (err) {
      res.statusMessage = err || err.statusMessage;
      res.status(406).end();
      return;
    }
    newUser.save().then(() => {
      res.status(201).end();
    }, (exists) => {
      res.statusMessage = "user " + exists.userName + "exists";
      res.status(422).end();
    });
  }

});

module.exports = router;
