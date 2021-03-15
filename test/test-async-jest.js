
test('just show how a client would use getBook', (done) => {
    let $ = {
        ajax: function (opts) {
            opts.done({
                isbn: '123445898',
                title: 'Les Miserables',
                available: 1
            });
        }
    }
    try {
        getBook($.ajax, '123445898', (title) => {
            alertBookFound(title);
            done();
        });
    } catch (err) {
        alertBookNotFound(err);
        done();
    }
});

test('getBook returns title when book is found', (done) => {
    let fakeAjax = function (opts) {
        opts.done({
            isbn: '123445898',
            title: 'Les Miserables',
            available: 1
        });
    };
    try {
        getBook(fakeAjax, '123445898', (title) => {
            expect(title).toBe('Les Miserables');
            done();
        });
    } catch (err) {
        fail("Book is available, but was not found!");
        done();
    }
});

test('getBook throws err when book is not available', (done) => {
    let fakeAjax = function (opts) {
        opts.done({
            // isbn: '123445898',
            // title: 'Les Miserables',
            available: 0
        });
    };
    try {
        getBook(fakeAjax, '123445898', (title) => {
            fail("Book was not available, but was found!");
            done();
        });
    } catch (err) {
        expect(err).toBe("No copies are available!");
        done();
    }
});

function getBook(how, isbn, res) {
    how({
        type: 'GET',
        url: "http://library.com/books/" + isbn,
        done: function (book) {
            if (book.available) {
                res(book.title);
            } else {
                throw "No copies are available!";
            }
        }
    });
}

function alertBookFound(title) {
    console.log("Requested book " + title + " is available.");
}

function alertBookNotFound(err) {
    console.log(err);
}

test('getBookWithPromise returns title when book is found', () => {
    let fakeAjax = function (opts) {
        opts.done({
            isbn: '123445898',
            title: 'Les Miserables',
            available: 1
        });
    };
    return getBookWithPromise(fakeAjax, '123445898').then(title => {
        expect(title).toBe('Les Miserables');
    }).catch(err => {
        fail("Book is available, but was not found!");
    });
});

test('async version: getBookWithPromise returns title when book is found', async () => {
    let fakeAjax = function (opts) {
        opts.done({
            isbn: '123445898',
            title: 'Les Miserables',
            available: 1
        });
    };
    let title = await getBookWithPromise(fakeAjax, '123445898');
    expect(title).toBe('Les Miserables');
});

function getBookWithPromise(how, isbn) {
    return new Promise(function (resolve, reject) {
        how({
            type: 'GET',
            url: "http://library.com/books/" + isbn,
            done: function (book) {
                if (book.available) {
                    resolve(book.title);
                } else {
                    reject("No copies are available!");
                }
            }
        });
    });
}



