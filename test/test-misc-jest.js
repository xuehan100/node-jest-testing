jest.setTimeout(500);


test('check set equality works', function (done) {
    expect(new Set([1, 2, 3])).toEqual(new Set([2, 1, 3]));
    expect([1, 2, 3]).not.toEqual([2, 1, 3]);
    done();
});

test('when done cb is omitted, test passes', function () {
    //
});

test('when done cb exists but you forget to call it, test fails with timeout', function (done) {
    // nothing here
});

test("callback encapsulating a promise, should pass", done => {
    foo("data", 0, function (err, res) {
        expect(err).toBe(false);
        expect(res).toBe("right object");
        done();
    });
});

test("callback encapsulating a promise, err case, should pass", done => {
    foo("data", 1, function (err, res) {
        expect(err).toBe(true);
        expect(res).toBe("something is wrong");
        done();
    });
});

test("callback encapsulating a promise, should fail with timeout", done => {
    foo("data", 1, function (err, res) {
        expect(err).toBe(false);
        done(); // done will never be called when assertion fails because of use of promise in called code
    });
});

test("promise encapsulating a promise, should fail gracefully", () => {
    return betterfoo("data", 1).then((res) => { // return the promise to inform mocha
        expect(res).toBe("right object");
    }).catch((err) => {
        fail("o oh, I didn't expect this!");
    });
});

test("async function encapsulating a promise, should pass", async () => {
    let res = await evenbetterfoo("data", 0);
    expect(res).toBe("right object");
});

test("variation: async function encapsulating a promise, should pass", async () => {
    await expect(evenbetterfoo("data", 0)).resolves.toBe("right object");
});

test("callback encapsulating a promise, without done, will always pass", () => {
    foo("data", 0, function (err, res) {
        expect(false).toBe(true);
    });
});

/* callback encapsulating a promise  */
function foo(mydata, myerr, cb) {
    let timeStamp = new Date()//set current date

    let newInvestigation = {
        timestamp: timeStamp,
        data: mydata,
        err: myerr
    };
    newInvestigation.save = function () {
        return new Promise((resolve, reject) => {
            // fake async function
            setTimeout(function () {
                if (newInvestigation.err) {
                    reject("something is wrong");
                } else {
                    resolve("right object");
                }
            }, 500);
        })
    };

    newInvestigation.save().then(function (res) {
        //console.log(res);
        cb(false, res);
    }).catch((err) => {
        // console.log(err)
        cb(true, err);
    }).catch((err) => {  // this is necessary in case an error is thrown in the cb
        // console.log(err)
    });
}

/* better version: promise encapsulating a promise */
function betterfoo(mydata, myerr) {
    let timeStamp = new Date()//set current date

    let newInvestigation = {
        timestamp: timeStamp,
        data: mydata,
        err: myerr
    };
    newInvestigation.save = function () {
        return new Promise((resolve, reject) => {
            // fake async function
            setTimeout(function () {
                if (newInvestigation.err) {
                    reject("something is wrong");
                } else {
                    resolve("right object");
                }
            }, 500);
        })
    };

    return newInvestigation.save(); // returns a promise
}

/* even better version: async function encapsulating a promise */
async function evenbetterfoo(mydata, myerr) {
    let timeStamp = new Date()//set current date

    let newInvestigation = {
        timestamp: timeStamp,
        data: mydata,
        err: myerr
    };
    newInvestigation.save = function () {
        return new Promise((resolve, reject) => {
            // fake async function
            setTimeout(function () {
                if (newInvestigation.err) {
                    reject("something is wrong");
                } else {
                    resolve("right object");
                }
            }, 500);
        })
    };

    return await newInvestigation.save(); // returns a promise
}

test("seemingly async, but effectively sync code", () => {
    let add = function (x, y, callback) {
        callback(x + y);
    } // just returning result via callback, structurally async

    let tata;
    add(4, 5, (result) => {
        tata = result; // … but effectively sync
    });
    expect(tata).toBe(9);
});

test("singleton has single instance", () => {
    let Singleton = require('../lectureExamples/singleton.js').Singleton;

    s = new Singleton();
    expect(s.instance).toBeUndefined();
    expect(s.curId()).toBe("id = myid");
    s.id = "yourid";
    expect(s.curId()).toBe("id = yourid");
    s = new Singleton();
    expect(s.curId()).toBe("id = yourid");
});


