describe('An object literal can also contain setters', () => {
  describe('defining: a setter', function () {
    it('by prefixing the property with `set` (and make it a function)', function () {
      let theX = null;
      const obj = {
        set x(newX) { theX = newX; }
      };
      obj.x = 'the new X';
      assert.equal(theX, 'the new X');
    });
    it('must have exactly one parameter', function () {
      let setterCalledWith = void 0;
      const obj = {
        set x(val) {
          if (arguments.length === 1) {
            setterCalledWith = arguments[0];
          }
        }
      };
      assert.equal(obj.x = 'new value', setterCalledWith);
    });
    it('can be a computed property (an expression enclosed in `[]`)', function () {
      const publicPropertyName = 'x';
      const privatePropertyName = '_' + publicPropertyName;
      const obj = {
        [privatePropertyName]: null,
        set [publicPropertyName](val) { this[privatePropertyName] = val }
      };
      obj.x = 'axe';
      assert.equal(obj._x, 'axe');
    });
  });
  describe('working with/on the setter', function () {
    it('you can use `delete` to remove the property (including it`s setter)', function () {
      let setterCalled = false;
      const obj = {
        set x(param) { setterCalled = true; }
      };
      delete obj.x;

      obj.x = true;
      assert.equal(setterCalled, false);
    });
  });
  it('must not overlap with a pure property', function () {
    const obj = {
      _x: 1,
      set x(_) { this._x = 'ax'; },
      get x() { return this._x; }
    };
    obj.x = undefined;
    assert.equal(obj.x, 'ax');
  });
  it('multiple `set` for the same property are not allowed', function () {
    const obj = {
      _x: 1,
      set x(_) { return this._x = 'ax'; },
      get x() { return this._x; }
    };
    obj.x = '';
    assert.equal(obj.x, 'ax');
  });
});
