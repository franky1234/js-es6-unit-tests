class ConsumableUsers {
  constructor() {
    this.users = ['Alice', 'Bob'];
    this.size = this.users.length;
  }
  get nextUser() {
    if (this.users.length > 0) {
      const current = this.users.shift();
      this.size -= 1;
      return `user: ${current}`;
    }
    this.size -= 1;
    return void 0;
  }
  get anyLeft() {
    return this.size >= 0 ? false : true;
  }
}

describe('Iterator usages', () => {

  let usersIterable;
  beforeEach(function () {
    const consumableUsers = new ConsumableUsers();
    function iteratorFunction() {
      return {
        next: function () {
          return { value: consumableUsers.nextUser, done: consumableUsers.anyLeft }
        }
      }
    }
    usersIterable = {};
    usersIterable[Symbol.iterator] = iteratorFunction;
  });

  describe('create an iterator/iterable', function () {
    it('the `usersIterable` should be iterable', function () {
      const isIterable = Symbol.iterator in usersIterable;
      assert.equal(isIterable, true);
    });
    it('the iterator of `usersIterable` should return an object', function () {
      const iterator = usersIterable[Symbol.iterator]();
      assert.equal(typeof iterator, 'object');
    });
    it('the iterator of `usersIterable` should have a next function', function () {
      const iterator = usersIterable[Symbol.iterator]();
      assert.equal(typeof iterator.next, 'function');
    });
  });

  describe('fill the iterable with content using `ConsumableUsers`', function () {
    describe('using the iterator', function () {
      let iterator;
      beforeEach(function () {
        iterator = usersIterable[Symbol.iterator]();
      });
      it('should return `Alice` as first user', function () {
        const firstItem = iterator.next();
        assert.deepEqual(firstItem, { value: "user: Alice", done: false });
      });
      it('should return `Bob` as second user', function () {
        iterator.next(); // drop the first item
        const secondItem = iterator.next();
        assert.deepEqual(secondItem, { value: "user: Bob", done: false });
      });
      it('should return `done:true`, which means there are no more items', function () {
        iterator.next();
        iterator.next();
        const beyondLast = iterator.next();
        assert.deepEqual(beyondLast, { value: void 0, done: true });
      })
    });

    describe('using built-in constructs', function () {
      it('use `Array.from()` to convert an iterable to an array', function () {
        const users = Array.from(usersIterable);
        assert.deepEqual(users, ['user: Alice', 'user: Bob']);
      });
      it('use for-of to loop over an iterable', function () {
        const users = [];
        for (let user of usersIterable) {
          users.push(user);
        };
        assert.deepEqual(users, ['user: Alice', 'user: Bob']);
      });
      it('use the spread-operator to convert/add iterable to an array', function () {
        const users = ['noname', ...usersIterable];
        assert.deepEqual(users, ['noname', 'user: Alice', 'user: Bob']);
      });
      it('destructure an iterable like an array', function () {
        const [firstUser, secondUser] = usersIterable;
        assert.equal(firstUser, 'user: Alice');
        assert.equal(secondUser, 'user: Bob');
      })
    });
  });
});
