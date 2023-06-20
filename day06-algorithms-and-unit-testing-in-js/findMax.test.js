const findMax = require('./findMax');

describe('findMax function returns the maximum number in an array', () => {
    test("findMax([]) => null", () => {
        expect(findMax([])).toBe(null);
    });

    test("findMax([1]) => 1", () => {
        expect(findMax([1])).toBe(1);
    });

    test("findMax([1, 5, 4, 3, 2]) => 5", () => {
        expect(findMax([1, 5, 4, 3, 2])).toBe(5);
    });
});
