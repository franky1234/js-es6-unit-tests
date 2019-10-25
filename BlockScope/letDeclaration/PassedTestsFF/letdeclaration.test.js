describe('`let` restricts the scope of the variable to the current block', () => {
  describe('`let` vs. `var`', () => {
    it('`var` works as usual, it`s scope is the function', () => {
      let varX;
      if (true) {
        varX = true;
      }
      assert.equal(varX, true);
    });
    it('`let` restricts scope to inside the block', () => {
      if (true) {
        let letX = true;
      }
      assert.throws(() => console.log(letX));
    });
  });

  describe('`let` usage', () => {
    it('`let` use in `for` loops', () => {
      let obj = { x: 1 };
      for (let key in obj) { }
      assert.throws(() => console.log(key));
    });
    it('create artifical scope, using curly braces', () => {
      {
        const letX = true;
      }
      assert.throws(() => console.log(letX));
    });
  });
});
