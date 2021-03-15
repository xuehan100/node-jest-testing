
let agent = require('superagent');
var DB = require('../services/dbLite').DBLite;
var DAO = require('../services/dao').DAO;
var Status = require('../models/status').Status;

let PORT = 3000;
let HOST = 'http://localhost:' + PORT;

// Initiate Server
let app = require('../app');

var server;

beforeAll(async (done) => {
  server = app.listen(PORT, () => done());
});

beforeEach(() => {
  DAO.db = new DB();
});

afterAll(async () => {
  await server.close();
});

// Dummy Users
var dummy = { username: 'Arthur', password: 'vwy207', status: Status.HELP };
var goofy = { username: 'Ritvik', password: 'vwy207', status: Status.OK };
var silly = { username: 'access', password: 'xyz124', status: Status.OK };
var folly = { username: 'Jane', password: 'aa', status: Status.OK };

test('Can post a new user', (done) => {
  agent.post(HOST + '/users')
    .send(dummy)
    .end(function (err, res) {
      expect(err).toBe(null);
      expect(res.statusCode).toBe(201);

      agent.get(HOST + '/users')
        .send()
        .end(function (err, res) {
          expect(err).toBe(null);
          let users = res.body;
          let arthur = users.find((u) => u.username === dummy.username);
          expect(arthur.username).toBe(dummy.username);
          done();
        });
    });
});


test('Can post a new user - promise version', () => {
  /* 
    I can't use await at top level function so I have to wrap the code in
    an anonymous async function, and then return the promise to let jest know 
    when test is done. There is no done callback because I'm returning the promise. 
  */
  return (async () => {
    await agent.post(HOST + '/users')
      .send(dummy)
      .then((res, err) => {
        expect(err).toBe(undefined);
        expect(res.statusCode).toBe(201);
      });
    await agent.get(HOST + '/users')
      .send()
      .then((res) => {
        let users = res.body;
        let arthur = users.find((u) => u.username === dummy.username);
        expect(arthur.username).toBe(dummy.username);
      }).catch(err => {
        expect(err).toBe(undefined);
      });
  })().catch(e => {
    // deal with chain fail
  })
});


test('Can post a new user - simpler promise version', async () => {
    // simpler version, not needing an anon function, just add "async" to function param
    await agent.post(HOST + '/users')
      .send(dummy)
      .then((res, err) => {
        expect(err).toBe(undefined);
        expect(res.statusCode).toBe(201);
      }).catch(e => {
        // deal with it 
      });
    return await agent.get(HOST + '/users')
      .send()
      .then((res) => {
        let users = res.body;
        let arthur = users.find((u) => u.username === dummy.username);
        expect(arthur.username).toBe(dummy.username);
      }).catch(err => {
        expect(err).toBe(undefined);
      }).catch(e => {
        // deal with it 
  })
});

test('Should not be able to post an exsisting user with rigth response code', (done) => {
  agent.post(HOST + '/users')
    .send(goofy)
    .end(function (err, res) {
      expect(err).not.toBe(null);
      expect(res.statusCode).toBe(422);
      done();
    });
});

test('Can get all users', (done) => {
  agent.get(HOST + '/users')
    .send()
    .end(function (err, res) {
      expect(err).toBe(null);
      expect(res.statusCode).toBe(200);
      let users = res.body;
      expect(users).toContainEqual({
        username: 'Anton',
        password: 'abc123',
        status: Status.OK
      });
      expect(users).toContainEqual({
        username: 'Ritvik',
        password: 'def012',
        status: Status.HELP
      });
      done();
    });
});

test('Can get users in emergency', (done) => {
  agent.get(HOST + '/users/emergency')
    .send()
    .end(function (err, res) {
      expect(err).toBe(null);
      expect(res.statusCode).toBe(200);
      let users = res.body;
      expect(users).not.toContainEqual({ username: 'Anton', password: 'abc123', status: Status.OK });
      expect(users).toContainEqual({ username: 'Ritvik', password: 'def012', status: Status.HELP });
      done();
    });
});

test('Should reject post with invalid username with right response code', (done) => {
  agent.post(HOST + '/users')
    .send(silly)
    .end(function (err, res) {
      expect(err).not.toBe(null);
      expect(res.statusCode).toBe(406);
      done();
    });
});

test('Should reject post with invalid password with right response code', (done) => {
  agent.post(HOST + '/users')
    .send(folly)
    .end(function (err, res) {
      expect(err).not.toBe(null);
      expect(res.statusCode).toBe(406);
      done();
    });
});

