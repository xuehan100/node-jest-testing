
later = require('../lectureExamples/ex4').later;

test('async function later can produce result', function (done) {
    later("Whatever!", function (result) {
        // console.log(result);
        expect(result).toBe("Whatever!");
        done();
    });
});


