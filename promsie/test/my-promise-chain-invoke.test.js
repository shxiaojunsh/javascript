const assert = require('assert');

describe('MyPromise Chain Tests', () => {
    const MyPromise = require('../my-promise');
    process.env.TRACE_ENABLED = true;
    beforeEach(() => { });

    describe('MyPromise Body Sync Resolve Tests', () => {
        const user = {
            name: 'xiaoming',
            age: 18,
        };
        let involveCount = 0;

        beforeEach(() => {
            involveCount = 0;
        });

        xit('.then.catch', done => {
            new MyPromise((resolve, reject) => {
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

        xit('.then.error.catch', done => {
            new MyPromise((resolve, reject) => {
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

        xit('.then.error.then.catch', done => {
            new MyPromise((resolve, reject) => {
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

        xit('.then.error.then.then.catch', done => {
            new MyPromise((resolve, reject) => {
                resolve(user);
            })
            .then(data => {
                assert.equal(data.name, 'xiaoming');
                assert.equal(data.age, 18);
                involveCount++;
                throw new Error('mocked error 1');
            })
            .then(() => {
                assert.fail('unexpected here1');
            })
            .then(() => {
                assert.fail('unexpected here2');
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

        it('.then.error.then', done => {
            new MyPromise((resolve, reject) => {
                resolve(user);
            })
            .then(data => {
                assert.equal(data.name, 'xiaoming');
                assert.equal(data.age, 18);
                console.log(data.age)
                throw new Error('mocked error 1');
            })
            .then(() => {
                assert.fail('unexpected here');
            });
        });

        xit('.then.error.then.catch.then', done => {
            new MyPromise((resolve, reject) => {
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
                return {
                    name: 'zhao gang',
                    age: 20
                }
            })
            .then(data => {
                assert.equal(data.name, 'zhao gang');
                assert.equal(data.age, 20);
                involveCount++;
            });

            setTimeout(() => {
                assert.equal(involveCount, 3);
                done();
            }, 10);
        });

        xit('.catch.then', done => {
            new MyPromise((resolve, reject) => {
                resolve(user);
            })
            .catch(() => {
                assert.fail('unexpected here');
            })
            .then(data => {
                assert.equal(data.name, 'xiaoming');
                assert.equal(data.age, 18);
                involveCount++;
                return data;
            });

            setTimeout(() => {
                assert.equal(involveCount, 1);
                done();
            }, 10);
        });

        xit('.then.then.then.catch', done => {
            new MyPromise((resolve, reject) => {
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
