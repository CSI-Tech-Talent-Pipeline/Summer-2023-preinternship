const factorial = require('./factorial')

describe('factorial(n) computes the factorial of N', () => {
    test('factorial(0) = 1', () => {
        expect(factorial(0)).toBe(1)
    })

    test('factorial(1) = 1', () => {
        expect(factorial(1)).toBe(1)
    })

    test('factorial(2) = 2', () => {
        expect(factorial(2)).toBe(2)
    })
    
})