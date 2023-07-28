# Sliding Window Algorithm - JavaScript Codealong

Welcome! This lesson is part of our Technical Interview Prep Course, where we dive into commonly used algorithms and data structures. Today, we'll explore the Sliding Window Algorithm using JavaScript. Although you're familiar with C++, this course focuses on JavaScript, a language widely used in web development and commonly encountered in technical interviews.

## Prerequisites 

To follow this lesson, you should:

- Have a good understanding of JavaScript, including ES6 syntax, functions, and arrays.
- Understand basic algorithmic concepts like time and space complexity.

## Table of Contents

- [Introduction to Sliding Window Algorithm](#introduction-to-sliding-window-algorithm)
- [Walkthrough with Example](#walkthrough-with-example)
- [Codealong](#codealong)
- [Complexity Analysis](#complexity-analysis)
- [When to Use the Sliding Window Pattern](#when-to-use-the-sliding-window-pattern)
- [Practice Problems](#practice-problems)

## Introduction to Sliding Window Algorithm

The Sliding Window pattern is a method that involves creating a 'window' which could either be an array or number from the given array/string. This 'window' slides or moves towards the right in the array/string depending on the condition set.

The following ASCII art represents an array and the sliding window within it. The numbers in brackets represent the array elements, and the vertical bars indicate the boundaries of the window. We will use the array `[1, 3, 5, 2, 8, 9, 1, 5, 2]` and a window size of 3 for this example.

Initial window position:
```
| 1, 3, 5 | 2, 8, 9, 1, 5, 2
```

After first slide:
```
1, | 3, 5, 2 | 8, 9, 1, 5, 2
```

After second slide:
```
1, 3, | 5, 2, 8 | 9, 1, 5, 2
```



## Walkthrough with Example

Suppose you're given an array of integers and you're asked to find the maximum sum of any contiguous subarray of size 'k'. This is a classic problem where the Sliding Window pattern can be applied.

Array: `[2, 1, 5, 1, 3, 2]`, k = 3
The answer should be 9, achieved by the subarray `[5, 1, 3]`.


## Codealong

```js
function maxSubArrayOfSizeK(arr, k) {

}
```

**Step 1:** Initialize variables for the maximum sum (`maxSum`), the current window sum (`windowSum`), and the start of the window (`windowStart`).
```javascript
let maxSum = 0;
let windowSum = 0;
let windowStart = 0;
```

**Step 2:** Start a loop that goes through each element in the array from left to right (`windowEnd` is the end of the window).
```javascript
for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
```

**Step 3:** Add the next element to the current window sum.
```javascript
windowSum += arr[windowEnd];
```

**Step 4:** Check if the window size is reached. If it is, then update the maximum sum, subtract the first element of the window from the window sum, and slide the window one element to the right.
```javascript
if (windowEnd >= k - 1) {
    maxSum = Math.max(maxSum, windowSum);
    windowSum -= arr[windowStart];
    windowStart++;
}
```

**Step 5:** Close the loop.
```javascript
}
```

**Step 6:** Return the maximum sum.
```javascript
return maxSum;
```

**Step 7:** Test the function with an example.
```javascript
console.log(maxSubArrayOfSizeK([2, 1, 5, 1, 3, 2], 3)); // should print '9'
```


## Complexity Analysis

The time complexity of the Sliding Window algorithm is O(N), where 'N' is the number of elements in the input array. This is because each element in the array is processed only once.

The algorithm runs in constant space O(1), making the space complexity of our algorithm also O(1).

## When to Use the Sliding Window Pattern

The Sliding Window pattern works well when:

- You're asked to find an optimal contiguous sequence in a larger sequence (e.g., array or string).
- The problem involves a data structure that is ordered and iterable like an array or a string.
- You're asked to find a subrange in an array/string, or to calculate something among all contiguous subarrays/substrings of a specific size.

## Practice Problems

Here are some problems where the Sliding Window pattern can be applied effectively. Try to solve these on your own:

1. Given a string, find the length of the longest substring without repeating characters.
2. Given an array of positive numbers and a positive number ‘k,’ find the maximum sum of any contiguous subarray of size ‘k.’
3. Given an array of positive numbers and a positive number ‘k,’ find the smallest contiguous subarray with a sum of at least ‘k’. Return its length, return 0 if no such subarray exists.
4. Given a string and a set of characters, find the smallest substring that contains every character in the set.

---
