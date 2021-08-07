const assert = require('assert');
const PromiseClass = Promise;
PromiseClass.name = 'Promise';

describe(`${PromiseClass.name} Chain Tests`, () => {

    describe(`${PromiseClass.name} Body Sync Resolve Tests`, () => {
        const user = {
            name: 'xiaoming',
            age: 18,
        };
        let involveCount = 0;

        beforeEach(() => {
            involveCount = 0;
        });

        it('.then.catch', done => {
            new PromiseClass((resolve, reject) => {
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

        it('.then.error.catch', done => {
            new PromiseClass((resolve, reject) => {
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

        it('.then.error.then.catch', done => {
            new PromiseClass((resolve, reject) => {
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

        it('.then.error.then.then.catch', done => {
            new PromiseClass((resolve, reject) => {
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

        it('.then.error.then.catch.then', done => {
            new PromiseClass((resolve, reject) => {
                resolve(user);
            })
            .then(data => {
                assert.equal(data.name, 'xiaoming');
                assert.equal(data.age, 18);
                involveCount++;
                return new PromiseClass((resolve, reject) => reject({message: 'mocked error 1'}));
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

        it('.catch.then', done => {
            new PromiseClass((resolve, reject) => {
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

        it('.then.then.then.catch', done => {
            new PromiseClass((resolve, reject) => {
                resolve(user);
            })
            .then(data => {
                assert.equal(data.name, 'xiaoming');
                assert.equal(data.age, 18);
                involveCount++;
                return new PromiseClass((resolve, reject) => resolve(data));
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

    describe(`${PromiseClass.name} Body Sync Reject Tests`, () => {
        const errorMsg = `${PromiseClass.name} Body Sync Reject Tests`;
        const errorInfo = {
            message: errorMsg
        };
        let involveCount = 0;

        beforeEach(() => {
            involveCount = 0;
        });

        it('.then(okHandler, errorHandler)', done => {
            new PromiseClass((resolve, reject) => {
                reject(errorInfo);
            })
            .then(data => {
                assert.fail('unexpected here');
            }, error => {
                involveCount++;
                assert.equal(error.message, errorMsg);
            });

            setTimeout(() => {
                assert.equal(involveCount, 1);
                done();
            }, 10);
        });

        it('.then.catch', done => {
            new PromiseClass((resolve, reject) => {
                reject(errorInfo);
            })
            .then(data => {
                assert.fail('unexpected here');
            })
            .catch(error => {
                involveCount++;
                assert.equal(error.message, errorMsg);
            });

            setTimeout(() => {
                assert.equal(involveCount, 1);
                done();
            }, 10);
        });

        it('.then.catch.then', done => {
            new PromiseClass((resolve, reject) => {
                reject(errorInfo);
            })
            .then(() => {
                assert.fail('unexpected here');
            })
            .catch(error => {
                assert.equal(error.message, errorMsg);
                involveCount++;
                return {
                    name: 'zhao gang',
                    age: 20
                };
            })
            .then(data => {
                assert.equal(data.name, 'zhao gang');
                assert.equal(data.age, 20);
                involveCount++;
            });

            setTimeout(() => {
                assert.equal(involveCount, 2);
                done();
            }, 10);
        });

        it('.catch.then', done => {
            new PromiseClass((resolve, reject) => {
                reject(errorInfo);
            })
            .catch(error => {
                assert.equal(error.message, errorMsg);
                involveCount++;
                return {
                    name: 'xiaoming',
                    age: 18
                };
            })
            .then(data => {
                assert.equal(data.name, 'xiaoming');
                assert.equal(data.age, 18);
                involveCount++;
                return data;
            });

            setTimeout(() => {
                assert.equal(involveCount, 2);
                done();
            }, 10);
        });

        it('.then.then.catch', done => {
            new PromiseClass((resolve, reject) => {
                reject(errorInfo);
            })
            .then(() => {
                assert.fail('unexpected here');
            })
            .then(() => {
                assert.fail('unexpected here');
            })
            .catch(error => {
                assert.equal(error.message, errorMsg);
                involveCount++;
            });

            setTimeout(() => {
                assert.equal(involveCount, 1);
                done();
            }, 10);
        });
    });

    describe(`${PromiseClass.name} Body Async Resolve Tests`, () => {
        const user = {
            name: 'xiaoming',
            age: 18,
        };
        let involveCount = 0;

        beforeEach(() => {
            involveCount = 0;
        });

        it('.then.catch', done => {
            new PromiseClass((resolve, reject) => {
                setTimeout(() => {
                    resolve(user);
                }, 20);
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
            }, 30);
        });

        it('.then.error.catch', done => {
            new PromiseClass((resolve, reject) => {
                setTimeout(() => {
                    resolve(user);
                }, 20);
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
            }, 30);
        });

        it('.then.error.then.catch', done => {
            new PromiseClass((resolve, reject) => {
                setTimeout(() => {
                    resolve(user);
                }, 20);
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
            }, 30);
        });

        it('.then.error.then.then.catch', done => {
            new PromiseClass((resolve, reject) => {
                setTimeout(() => {
                    resolve(user);
                }, 20);
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
            }, 30);
        });

        it('.then.error.then.catch.then', done => {
            new PromiseClass((resolve, reject) => {
                setTimeout(() => {
                    resolve(user);
                }, 20);
            })
            .then(data => {
                assert.equal(data.name, 'xiaoming');
                assert.equal(data.age, 18);
                involveCount++;
                return new PromiseClass((resolve, reject) => setTimeout(() => reject({message: 'mocked error 1'}), 5));
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
            }, 40);
        });

        it('.catch.then', done => {
            new PromiseClass((resolve, reject) => {
                setTimeout(() => {
                    resolve(user);
                }, 20);
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
            }, 30);
        });

        it('.then.then.then.catch', done => {
            new PromiseClass((resolve, reject) => {
                setTimeout(() => {
                    resolve(user);
                }, 20);
            })
            .then(data => {
                assert.equal(data.name, 'xiaoming');
                assert.equal(data.age, 18);
                involveCount++;
                return new PromiseClass((resolve, reject) => setTimeout(() => resolve(data), 5));
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
            }, 40);
        });
    });

    describe(`${PromiseClass.name} Body Async Reject Tests`, () => {
        const errorMsg = `${PromiseClass.name} Body Sync Reject Tests`;
        const errorInfo = {
            message: errorMsg
        };
        let involveCount = 0;

        beforeEach(() => {
            involveCount = 0;
        });

        it('.then(okHandler, errorHandler)', done => {
            new PromiseClass((resolve, reject) => {
                setTimeout(() => {
                    reject(errorInfo);
                }, 20);
            })
            .then(() => {
                assert.fail('unexpected here');
            }, error => {
                involveCount++;
                assert.equal(error.message, errorMsg);
            });

            setTimeout(() => {
                assert.equal(involveCount, 1);
                done();
            }, 30);
        });

        it('.then.catch', done => {
            new PromiseClass((resolve, reject) => {
                setTimeout(() => {
                    reject(errorInfo);
                }, 20);
            })
            .then(() => {
                assert.fail('unexpected here');
            })
            .catch(error => {
                involveCount++;
                assert.equal(error.message, errorMsg);
            });

            setTimeout(() => {
                assert.equal(involveCount, 1);
                done();
            }, 30);
        });

        it('.then.catch.then', done => {
            new PromiseClass((resolve, reject) => {
                setTimeout(() => {
                    reject(errorInfo);
                }, 20);
            })
            .then(() => {
                assert.fail('unexpected here');
            })
            .catch(error => {
                assert.equal(error.message, errorMsg);
                involveCount++;
                return {
                    name: 'zhao gang',
                    age: 20
                };
            })
            .then(data => {
                assert.equal(data.name, 'zhao gang');
                assert.equal(data.age, 20);
                involveCount++;
            });

            setTimeout(() => {
                assert.equal(involveCount, 2);
                done();
            }, 30);
        });

        it('.catch.then', done => {
            new PromiseClass((resolve, reject) => {
                setTimeout(() => {
                    reject(errorInfo);
                }, 20);
            })
            .catch(error => {
                assert.equal(error.message, errorMsg);
                involveCount++;
                return {
                    name: 'xiaoming',
                    age: 18
                };
            })
            .then(data => {
                assert.equal(data.name, 'xiaoming');
                assert.equal(data.age, 18);
                involveCount++;
                return data;
            });

            setTimeout(() => {
                assert.equal(involveCount, 2);
                done();
            }, 30);
        });

        it('.then.then.catch', done => {
            new PromiseClass((resolve, reject) => {
                setTimeout(() => {
                    reject(errorInfo);
                }, 30);
            })
            .then(() => {
                assert.fail('unexpected here');
            })
            .then(() => {
                assert.fail('unexpected here');
            })
            .catch(error => {
                assert.equal(error.message, errorMsg);
                involveCount++;
            });

            setTimeout(() => {
                assert.equal(involveCount, 1);
                done();
            }, 30);
        });
    });
});

describe(`${PromiseClass.name} Execution Sequence Tests`, () => {
    it('executing sequence', done => {
        const result = [];
        async function async1() {
            console.log('2. async1 start');
            result.push(2);
            await async2();
            console.log("6. async1 end");
            result.push(6);
        }
        async function async2() {
            console.log('3. async2');
            result.push(3);
        }
        console.log('1. script start');
        result.push(1);
        setTimeout(function () {
            console.log('8. settimeout');
            result.push(8);
        }, 0);
        async1();
        new Promise(function (resolve) {
            console.log("4. promise1");
            result.push(4);
            resolve();
        }).then(function () {
            console.log('7. promise2');
            result.push(7);
        });
        console.log('5. script end');
        result.push(5);

        setTimeout(() => {
            assert.equal(result.length, 8);
            let idx = 1;
            for (const i of result) {
                assert.equal(idx, i);
                idx++;
            }
            done();
        }, 10);
    });
});
