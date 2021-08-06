
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
    constructor(exeFunc, traceEnabled = false) {
        this.id = Math.random() * 10000;
        this.traceEnabled = traceEnabled || process.env.TRACE_ENABLED;

        this.state = PENDING;
        this.value = undefined;

        this.next = undefined;
        this.nextThen = undefined;
        this.nextCatch = undefined;

        this.onResolve = this.onResolve.bind(this);
        this.onReject = this.onReject.bind(this);

        this.trace('constructed');

        exeFunc(this.onResolve, this.onReject);
    }

    trace(arg, ...value) {
        if (this.traceEnabled) {
            const msg = `${new Date().toISOString()} id(${this.id}) ${arg}`;
            value && value.length > 0 ? console.log(msg, value) : console.log(msg);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        this.trace(`.then state: ${this.state}`);

        if (this.state === PENDING || this.state === FULFILLED) {
            this.next = new MyPromise((resolve, reject) => {
                this.nextThen = (data) => this.tryTerminatePromise(onFulfilled, resolve, reject, data);
                if (onRejected) {
                    onRejected = typeof onRejected === 'function' ? onRejected : value => value;
                    this.nextCatch = (error) => this.tryTerminatePromise(onRejected, resolve, reject, '', error);
                }
            });

        } else if (this.state === REJECTED) {
            if (onRejected) {
                onRejected = typeof onRejected === 'function' ? onRejected : value => value;
                this.next = new MyPromise((resolve, reject) => {
                    this.nextCatch = (error) => this.tryTerminatePromise(onRejected, resolve, reject, '', error);
                });
            } else {
                this.next = new MyPromise((resolve, reject) => {});
            }
        }

        return this.next;
    }

    catch(onRejected) {
        onRejected = typeof onRejected === "function" ? onRejected : (value) => value;
        this.trace(`.catch state: ${this.state}`);

        if (this.state === PENDING || this.state === REJECTED) {
            this.next = new MyPromise((resolve, reject) => {
                this.nextCatch = (error) => this.tryTerminatePromise(onRejected, resolve, reject, '', error);
            });
        } else if (this.state === FULFILLED) {
            this.next = new MyPromise((resolve, reject) => {});
            this.next.value = this.value;
        }

        return this.next;
    }

    onResolve(value) {
        this.trace(`onResolve, state: ${this.state}`);
        if (this.state === PENDING) {
            this.state = FULFILLED;
            this.value = value;
            process.nextTick(() => {
                const p = this.findNextThen(this);
                if (p) {
                    this.trace(`onResolve, involve next(${p.id}) then`);
                    p.nextThen(this.value);
                } else {
                    this.trace('onResolve, no next then found');
                }
            });
        }
    }

    findNextThen(promise) {
        if (!promise) {
            return undefined;
        } else if (promise.nextThen) {
            return promise;
        } else {
            return this.findNextThen(promise.next);
        }
    }

    onReject(error) {
        this.trace(`onReject, state: ${this.state}`);
        if (this.state === PENDING) {
            this.state = REJECTED;
            this.value = error;
            process.nextTick(() => {
                const p = this.findNextCatch(this);
                if (p) {
                    this.trace(`onReject, involve next(${p.id}) catch`);
                    p.nextCatch(error);
                } else {
                    this.trace(`onReject, unHandledRejectedPromise`, error);
                    throw new Error('unHandledRejectedPromise' + error);
                }
            });
        }
    }

    findNextCatch(promise) {
        if (!promise) {
            return undefined;
        } else if (promise.nextCatch) {
            return promise;
        } else {
            return this.findNextCatch(promise.next);
        }
    }

    tryTerminatePromise(onCallback, resolve, reject, data, error) {
        try {
            this.trace('tttp: try to terminate promise');
            const ret = onCallback(error || data);
            if (ret instanceof MyPromise) {
                this.trace('tttp, callback returned a MyPromise');
                ret.then(resolve).catch(reject);
            } else {
                this.trace('tttp, callback returned', ret);
                resolve(ret);
            }
        } catch (error) {
            this.trace('tttp, caught error', error);
            reject(error);
        }
    }
}

module.exports = MyPromise;
