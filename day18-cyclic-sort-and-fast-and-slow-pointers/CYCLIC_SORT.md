# Cyclic Sort Algorithm: JavaScript Edition

## Course Description:

This lesson is part of the "Technical Interviewing Skills" course, specifically designed for undergraduate students in Computer Science who are proficient in C++ and wish to apply their algorithmic knowledge to the JavaScript language. This lesson focuses on understanding and implementing the Cyclic Sort algorithm in JavaScript - a popular topic in technical interviews.

## Learning Objectives:
By the end of this lesson, you will:

1. Understand the logic behind the Cyclic Sort algorithm and why it's important in technical interviews.
2. Be able to implement the Cyclic Sort algorithm in JavaScript from scratch.
3. Understand the time and space complexities of the Cyclic Sort algorithm.
4. Be able to explain your code and thought process during a technical interview.

## Resources:
- JavaScript Basics: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction
- MDN JavaScript Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference

## Pre-requisites:
- Strong understanding of JavaScript syntax and programming concepts (functions, loops, arrays).
- Understanding of basic sorting algorithms.
- Basic knowledge of algorithmic complexity (Big O notation).

## Topics Covered:
1. Theoretical understanding of Cyclic Sort algorithm.
2. Implementing Cyclic Sort in JavaScript.
3. Understanding Time and Space complexity of Cyclic Sort.

## Lesson Structure:

1. **Introduction (10 mins)** - Brief discussion on Cyclic Sort, its uses, and where it stands compared to other sorting algorithms.

2. **Deep Dive (20 mins)** - Detailed explanation of how the algorithm works, with walkthrough of a provided JavaScript implementation.

3. **Hands-on Exercise (30 mins)** - Students write their own implementation of Cyclic Sort in JavaScript.

4. **Discussion (20 mins)** - Open forum to discuss the algorithm, potential edge cases, and how to handle them. Also, discussion of the algorithm's time and space complexity.

5. **Mock Interview (30 mins)** - Pair up and take turns interviewing each other. The interviewee will have to explain their implementation of Cyclic Sort, why they chose their approach, and analyze its time and space complexity.

## Assessment:
- Be able to implement Cyclic Sort in JavaScript without reference.
- Successfully explain your approach in the mock interview session.
- Analyze the time and space complexity of your implementation accurately.

## Homework:
Re-implement the Cyclic Sort algorithm on a piece of paper without reference. Also, write down an explanation of your implementation, as if you were describing it in a technical interview.

## Tips for Success:
- Make sure you understand the basics of JavaScript before jumping into the algorithm.
- Practice explaining your thought process out loud. This is a crucial skill for technical interviews.

# Cyclic Sort Algorithm: JavaScript Edition

## Introduction (10 mins)

In this section, we'll briefly discuss what the Cyclic Sort algorithm is, its use cases, and how it compares to other sorting algorithms.

### What is the Cyclic Sort?

Cyclic Sort is an in-place, linear time sorting algorithm that is specifically designed to sort arrays that contain unique positive integers that range from `1` to `n`, where `n` is the size of the array.

### Why Cyclic Sort?

Cyclic Sort shines in its simplicity and efficiency. If the given problem statement suits the constraints of this algorithm, it can be a more efficient alternative to other sorting algorithms, even Quick Sort and Merge Sort.

Here are some of its highlights:

- **In-place**: Cyclic Sort doesn't require any extra space. It sorts the array by swapping elements in place, which makes it memory efficient.
- **Linear time complexity**: The time complexity of Cyclic Sort is O(n), which makes it extremely efficient for large datasets.

### Comparing with other algorithms

Let's compare Cyclic Sort with some popular sorting algorithms:

- **Quick Sort/Merge Sort**: These are O(n log n) algorithms. In situations where the problem fits the constraints of Cyclic Sort, Cyclic Sort will outperform these algorithms due to its linear time complexity.
- **Bubble Sort/Insertion Sort**: These have a time complexity of O(n^2), which makes Cyclic Sort a much more efficient alternative.

### Why not always use Cyclic Sort if it's more efficient?

You won't always have a problem that fits this algorithm's constraints. To be exact, we need an array of unique positive integers that range from `1` to `n`, where `n` is the size of the array. If we're presented with a problem that involves an array that meets this description, then use Cyclic sort!

#### Example Problems where you could use cyclic sort

The Cyclic Sort algorithm is very effective in dealing with problems where the given input is a range of continuous numbers, especially when asked to solve in-place and linear time. Here are a few problems where Cyclic Sort might come in handy:

1. **Find the Missing Number**: You are given a list of `n-1` integers and these integers are in the range of `1` to `n`. There are no duplicates in the list. One of the integers is missing in the list. Write an algorithm to find the missing number. 

2. **Find all Missing Numbers**: You are given an unsorted array containing numbers taken from the range `1` to `n`. The array can have duplicates, which means some numbers will be missing. Find all those missing numbers.

3. **Find the Duplicate Number**: You are given an array of `n+1` elements. All elements of the array are in the range `1` to `n`. And all elements occur once except two. We need to find the repeating number. 

4. **Find all Duplicates**: Given an array of integers where each value `1 ≤ x ≤ len(array)`, write a function that finds all the duplicates in the array.

5. **Cyclically Sort a List**: Given an unsorted list of integers from `1` to `n`, sort the list in-place in linear time using the cyclic sort pattern.

6. **Find the Smallest Missing Positive Number**: Given an unsorted integer array, find the smallest missing positive integer.

7. **Find the Corrupt Pair**: You are given an unsorted array containing ‘n’ numbers taken from the range `1` to ‘n’. The array originally contained all the numbers from `1` to ‘n’, but due to a data error, one of the numbers got duplicated which also resulted in one number going missing. Find both these numbers.

These problems are all variants on the basic problem that the Cyclic Sort algorithm is designed to solve. If you see a problem that asks for an in-place and linear time solution and involves a continuous range of numbers, consider using the Cyclic Sort algorithm.

## Deep Dive

Let's dive into the details of how the Cyclic Sort algorithm works and walk through a JavaScript implementation.

### Understanding the Algorithm

The idea of the Cyclic Sort algorithm is to place each element in its correct index position. Given that we are dealing with unique positive integers from `1` to `n`, each element should be at an index that is one less than the element itself (since array indices in JavaScript start from `0`).

The process works as follows:

1. Start from the first element, compare it with its index.
2. If the element is not at the correct index, swap it with the element at its correct index position. 
3. If the element is at the correct index, do nothing.
3. Move on to the next index.
4. Repeat this process until the array is sorted.

### JavaScript Implementation

Let's breakdown the approach:

- We start by initializing a counter `i` at `0` (first element of the array).

```javascript
let i = 0;
```

- We then enter a `while` loop that continues while `i` is less than the length of the array.

```javascript
while (i < nums.length) {
  // ...
}
```

- Inside the loop, we calculate the correct index (`correctIndex`) of the current number (`nums[i]`). It should be one less than the number itself because arrays are `0` indexed.

```javascript
const correctIndex = nums[i] - 1;
```

- If the current index `i` isn't the `correctIndex` for `nums[i]`, then we swap `nums[i]` with the value at the correct index `nums[correctIndex]`. 

Because the numbers in the array are unique, we know that the value currently in `nums[correctIndex]` is also in the wrong place, because `nums[i]` should be there, so we'll never be swapping a number out of its proper place, and each time we iterate, at least one element will end up in the correct place.

```javascript
if (i !== correctIndex) {
  [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];  // swap
}
```

This line employs JavaScript's array destructuring to swap the elements at `i` and `correctIndex`.

- If the current number is already at the correct position, we won't perform a swap.

- Once we have either placed the current number at the correct position or left it in the correct place, we'll move on to the next index.

```javascript
i++;
```

- After the `while` loop finishes running, we'll have confirmed that every number has been placed in its correct position and we return the sorted array.

```javascript
return nums;
```

Here is the complete implementation of the Cyclic Sort algorithm in JavaScript:

```javascript
function cyclicSort(nums) {
  let i = 0;
  while (i < nums.length) {
    const correctIndex = nums[i] - 1;
    if (i !== correctIndex]) {
      [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]];  // swap
    } 
    i++;
  }
  return nums;
}

// Testing the function
console.log(cyclicSort([3, 1, 5, 4, 2]));  // Output: [1, 2, 3, 4, 5]
```


This should output a sorted version of the input array.

## Additional Resources:

- [More on JavaScript's array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [Big O Notation explained](https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/)
- [Other Sorting Algorithms](https://www.freecodecamp.org/news/sorting-algorithms-explained/)
- [JS Visualizer for Algorithms](https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html)
- [Cyclic Sort explanation (video)](https://www.youtube.com/watch?v=JfinxytTYFQ)

## Next Steps:

- Ensure that you understand each line of the provided code, why it is necessary, and how it contributes to the final result.
- Try to implement the cyclic sort algorithm from scratch without looking at the provided implementation.
- Modify the function to handle edge cases or unusual input. For instance, how should it handle an empty array? What about an array that's already sorted?
