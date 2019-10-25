describe('`Promise` API overview', function () {
  it('`new Promise()` requires a function as param', () => {
    const param = () => { };
    assert.doesNotThrow(() => { new Promise(param); });
  });
  describe('resolving a promise', () => {
    // reminder: the test passes when a fulfilled promise is returned
    it('via constructor parameter `new Promise((resolve) => { resolve(); })`', () => {
      const param = resolve => { resolve(); };
      return new Promise(param);
    });
    it('using `Promise.resolve()`', () => {
      return Promise.resolve('all fine');
    });
  });
  describe('a rejected promise', () => {
    it('using the constructor parameter', (done) => {
      const promise = new Promise((resolve, reject) => { reject(); });
      promise
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done());
    });
    it('via `Promise.reject()`', (done) => {
      const promise = Promise.reject();
      promise
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done());
    });
  });
  describe('`Promise.all()`', () => {
    it('`Promise.all([p1, p2])` resolves when all promises resolve', () => {
      return Promise.all([Promise.resolve(), Promise.resolve(), Promise.resolve()])
    });
    it('`Promise.all([p1, p2])` rejects when a promise is rejected', (done) => {
      Promise.all([Promise.resolve(), Promise.reject()])
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done())
    });
  });
  describe('`Promise.race()`', () => {
    it('`Promise.race([p1, p2])` resolves/reject when one of the promises resolves/rejects', () => {
      return Promise.race([Promise.resolve(), Promise.reject()])
    });
    it('`Promise.race([p1, p2])` rejects when one of the promises rejects', (done) => {
      Promise.race([Promise.reject(), Promise.resolve()])
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done())
    });
    it('`Promise.race([p1, p2])` order matters (and timing)', () => {
      const time1 = setTimeout(() => {
        return Promise.reject(2000);
      });
      const time2 = setTimeout(() => {
        return Promise.resolve(1000);
      });
      return Promise.race([time1, time2])
    });
  });
});
