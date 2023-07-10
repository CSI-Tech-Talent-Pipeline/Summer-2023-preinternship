const cyclicSort = require("./cyclic-sort");

describe("cyclicSort", () => {
  test("[1] => [1]", () => {
    expect(cyclicSort([1])).toEqual([1]);
  })
  test("[2,1] => [1,2]", () => {
    expect(cyclicSort([2,1])).toEqual([1,2]);
  })
  test("[5, 3, 2, 1, 4] => [1, 2, 3, 4, 5]", () => {
    expect(cyclicSort([5, 3, 2, 1, 4])).toEqual([1, 2, 3, 4, 5]);
  })
  test("[5, 2, 1, 3, 4] => [1, 2, 3, 4, 5]", () => {
    expect(cyclicSort([5, 2, 1, 3, 4])).toEqual([1, 2, 3, 4, 5]);
  })
  test("[5, 4, 3, 2, 1] => [1, 2, 3, 4, 5]", () => {
    expect(cyclicSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5]);
  })
})