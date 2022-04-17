//Propios Matcherers

expect.extend({
  toBeEqualTwo(n) {
    if (n !== 2) {
      return {
        message: () => `${n} is not equal to 2`,
        pass: false,
      };
    }
    return {
      pass: true,
    };
  },
});

test("number 2", () => {
  expect(2).toBeEqualTwo();
});
