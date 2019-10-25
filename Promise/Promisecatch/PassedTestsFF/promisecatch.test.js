describe('`catch()` returns a Promise and deals with rejected cases only', () => {
  describe('prerequisites for understanding', () => {
    it('*return* a fulfilled promise, to pass a test', () => {
      return Promise;
      assert(false); // Don't touch! Make the test pass in the line above!
    });
    it('reminder: the test passes when a fulfilled promise is returned', () => {
      return Promise.reject('I should fulfill.')
        .then()
        .catch(err => err);
    });
  });
  describe('`catch` method basics', () => {
    it('is an instance method', () => {
      const p = Promise.reject();
      assert.equal(typeof p.catch, 'function');
    });
    it('catches only promise rejections', (done) => {
      const promise = Promise.reject();
      promise
        .then(() => { done('Should not be called!'); })
        .catch(done);
    });
    it('returns a new promise', () => {
      const whatToReturn = () => Promise.reject();
      const promise = Promise.reject();
      return promise.catch(() =>
        whatToReturn
      );
    });
    it('converts it`s return value into a promise', () => {
      const p = Promise.reject();
      const p1 = p.catch(() => Promise.resolve('promise?'));
      return p1.then(result => assert.equal('promise?', result));
    });
    it('the first parameter is the rejection reason', () => {
      const p = Promise.reject('oops');
      return p.catch(reason => {
        assert.equal(reason, 'oops');
      });
    });
  });
  describe('multiple `catch`es', () => {
    it('only the first `catch` is called', () => {
      const p = Promise.reject('1 AND 2');
      const p1 = p
        .catch(p => p)
        .catch(reason => `${reason} AND 3`);
      return p1.then(result => assert.equal(result, '1 AND 2')
      );
    });
    it('if a `catch` throws, the next `catch` catches it', () => {
      const p = Promise.reject('1');
      const p1 = p
        .catch(reason => { throw Error(`${reason} AND 2`) })
        .catch(err => { throw Error(`${err.message} AND 3`) })
        .catch(err => `${err.message}`)
        ;
      return p1.then(result =>
        assert.equal(result, '1 AND 2 AND 3')
      );
    });
  });
});
