const twoPointersSum = require("./twoPointers"); // Adjust this to the correct path

describe("twoPointersSum", () => {
  test("returns the correct indices for a valid pair", () => {
    expect(twoPointersSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  test("returns [-1, -1] when no pair is found", () => {
    expect(twoPointersSum([2, 7, 11, 15], 20)).toEqual([-1, -1]);
  });
});
