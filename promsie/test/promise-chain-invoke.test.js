const assert = require('assert');

describe('Promise Chain Tests', () => {

    beforeEach(() => { });

    describe('Promise Body Sync Tests', () => {
        const user = {
            name: 'xiaoming',
            age: 18,
        };
        let involveCount = 0;

        beforeEach(() => {
            involveCount = 0;
        });

        it('.then.catch normally', done => {
            new Promise((resolve, reject) => {
                resolve(user);
            })
            .then(data => {
                assert.equal(data.name, 'xiaoming');
                assert.equal(data.age, 18);
                involveCount++;
                return data;
            })
            .catch(() => {
                assert.fail('unexpected here');
            });

            setTimeout(() => {
                assert.equal(involveCount, 1);
                done();
            }, 10);
        });

        it('.then.catch error', done => {
            new Promise((resolve, reject) => {
                resolve(user);
            })
            .then(data => {
                assert.equal(data.name, 'xiaoming');
                assert.equal(data.age, 18);
                involveCount++;
                throw new Error('mocked error 1');
            })
            .catch(error => {
                assert.equal(error.message, 'mocked error 1');
                involveCount++;
            });

            setTimeout(() => {
                assert.equal(involveCount, 2);
                done();
            }, 10);
        });

        it('.then.thowerror.then.catch error', done => {
            new Promise((resolve, reject) => {
                resolve(user);
            })
            .then(data => {
                assert.equal(data.name, 'xiaoming');
                assert.equal(data.age, 18);
                involveCount++;
                throw new Error('mocked error 1');
            })
            .then(() => {
                assert.fail('unexpected here');
            })
            .catch(error => {
                assert.equal(error.message, 'mocked error 1');
                involveCount++;
            });

            setTimeout(() => {
                assert.equal(involveCount, 2);
                done();
            }, 10);
        });

        it('.catch.then normally', done => {
            new Promise((resolve, reject) => {
                resolve(user);
            })
            .catch(() => {
                assert.fail('unexpected here');
            })
            .then(data => {
                assert.equal(data.name, 'xiaoming');
                assert.equal(data.age, 18);
                console.log(data.age);
                involveCount++;
                return data;
            });

            setTimeout(() => {
                assert.equal(involveCount, 1);
                done();
            }, 10);
        });

        it('.then.then.then.catch', done => {
            new Promise((resolve, reject) => {
                resolve(user);
            })
            .then(data => {
                assert.equal(data.name, 'xiaoming');
                assert.equal(data.age, 18);
                involveCount++;
                return data;
            })
            .then(data => {
                assert.equal(data.name, 'xiaoming');
                assert.equal(data.age, 18);
                involveCount++;
                return {
                    name: 'zhang liang',
                    age: 19,
                };
            })
            .then(data => {
                assert.equal(data.name, 'zhang liang');
                assert.equal(data.age, 19);
                involveCount++;
                throw new Error('mocked error 1');
            })
            .catch(error => {
                assert.equal(error.message, 'mocked error 1');
                involveCount++;
            });

            setTimeout(() => {
                assert.equal(involveCount, 4);
                done();
            }, 10);
        });
    });
});
