# Fast and Slow Pointers Algorithm: JavaScript Edition

## Introduction (10 mins)

In this section, we'll briefly discuss what the Fast and Slow pointers algorithm is, its use cases, and how it compares to other pointer-based techniques.

### What is the Fast and Slow Pointers Algorithm?

Fast and Slow pointers, also known as Floyd's cycle detection algorithm, is an algorithm that uses two pointers moving at different speeds to solve a range of problems, notably to detect cycles in a linked list or array.

### What is a Cycle? 

A cycle in the context of a linked list or an array is a sequence of elements with a repeating pattern that loops back to itself. In a linked list, a cycle exists when a node's `next` pointer points to a previous node in the list, causing a loop.

For example, consider the following linked list where each arrow represents a `next` pointer:

1 -> 2 -> 3 -> 4 -> 5  
     ^______________|

The node with value `5` points back to the node with value `2`, creating a cycle.

### Problem Types

The Fast and Slow pointers technique is often used for problems involving linked lists or arrays where a cycle might exist or some sequence of elements repeats. This method is also useful when you want to find the middle of a list without knowing the length of it in advance.

### Interview Questions

Here are a few example interview questions that might require the Fast and Slow pointers algorithm:

1. **Cycle Detection**: Given a linked list, determine if it contains a cycle. This is the classic use case for the Fast and Slow pointers algorithm.

2. **Cycle Length**: If a cycle exists in a linked list, can you determine its length? Once the Fast and Slow pointers meet, we can keep one pointer stationary and move the other until they meet again, counting the number of steps it takes.

3. **Start of Cycle**: Can you find the starting node of the cycle in a linked list? Once you've detected a cycle and calculated its length, you can reset the pointers to the head of the list, advance one pointer the length of the cycle steps forward, then move both pointers at the same speed. They'll meet at the start of the cycle.

4. **Happy Number**: A happy number is a number that eventually reaches 1 when replaced by the sum of the square of each digit. A number is considered unhappy if it loops endlessly in a cycle that does not include 1. Can you determine if a number is happy or not?

5. **Middle of the Linked List**: Can you find the middle node of a linked list in a single pass? The Fast and Slow pointers technique can be used here with the fast pointer moving twice as fast as the slow pointer.

6. **Palindrome Linked List**: Determine if a linked list is a palindrome. Using the Fast and Slow pointers technique, you can find the middle of the linked list, reverse the second half of the linked list, and then compare it with the first half.

As you can see, the Fast and Slow pointers technique is versatile and can solve a variety of problems involving cycles and/or traversal of sequences.


### Why Fast and Slow Pointers?

Here are some reasons to use the Fast and Slow pointers algorithm:

- **Cycle detection**: It can be used to detect cycles in a linked list or array, a common interview problem.
- **Space efficient**: It can be used to solve problems that would otherwise require additional space if solved using different techniques.
- **Practical**: The fast and slow pointers technique can also be used to find the middle of a linked list or to determine if a linked list is a palindrome.

### Comparing with other techniques

Fast and Slow pointers can solve problems that two regular pointers or a single pointer cannot. For example, detecting a cycle in a linked list is not possible using regular two-pointer or sliding window techniques. 

## Deep Dive (20 mins)

Let's dive into the details of how the Fast and Slow pointers algorithm works and walk through a JavaScript implementation.

### Understanding the Algorithm

The Fast and Slow pointers algorithm works by moving two pointers, one (the "slow" pointer) moving one step at a time and the other (the "fast" pointer) moving two steps at a time. If there's a cycle, the fast pointer will eventually meet the slow pointer inside the cycle.

### JavaScript Implementation

Here is a complete implementation of cycle detection in a linked list using the Fast and Slow pointers algorithm in JavaScript:

```javascript
class Node {
  constructor(value, next=null){
    this.value = value;
    this.next = next;
  }
}

function hasCycle(head) {
  let slow = head,
      fast = head;
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
    if (slow === fast) {
      return true;  // found the cycle
    }
  }
  return false;
}

// Testing the function
const head = new Node(1)
head.next = new Node(2)
head.next.next = new Node(3)
head.next.next.next = new Node(4)
head.next.next.next.next = new Node(5)
head.next.next.next.next.next = head.next.next
console.log(`LinkedList has cycle: ${hasCycle(head)}`)  // Output: LinkedList has cycle: true
```

Let's break down the code:

- We first define a `Node` class, which we'll use to create the linked list. Each `Node` has a `value` and a `next` pointer.

```javascript
class Node {
  constructor(value, next=null){
    this.value = value;
    this.next = next;
  }
}
```

- We then define the `hasCycle` function which accepts a head node of a linked list. We initiate two pointers, `slow` and `fast`, both pointing to `head`.

```javascript
let slow = head,
    fast = head;
```

- We continue moving `slow` one step at a time and `fast` two steps at a time until `fast` or `fast.next` becomes `null` (which indicates there's no cycle as we've reached the end).

```javascript
while (fast !== null && fast.next !== null) {
  fast = fast.next.next;
  slow = slow.next;
  // ...
}
```

- Inside the `while` loop, we check if `slow` and `fast` have met, which means a cycle exists.

```javascript
if (slow === fast) {
  return true;  // found the cycle
}
```

- If the `while` loop completes without finding a cycle, we return `false`.

```javascript
return false;
```

- Finally, we test our `hasCycle` function by creating a linked list with a cycle and calling `hasCycle` on it.

```javascript
const head = new Node(1)
// ...
console.log(`LinkedList has cycle: ${hasCycle(head)}`)  // Output: LinkedList has cycle: true
```

## Additional Resources:

- More on JavaScript Classes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
- Linked Lists Explained: https://www.freecodecamp.org/news/simple-introduction-to-linked-lists-in-javascript/

## Next Steps:

- Make sure you understand each line of the provided code, why it is necessary, and how it contributes to the final result.
- Try to implement the Fast and Slow pointers algorithm from scratch without looking at the provided implementation.
- Modify the function to solve other problems, like finding the length of the cycle or the start of the cycle.
- Try using this algorithm to solve the following problems:
  - **Cycle Length**: If a cycle exists in a linked list, can you determine its length? Once the Fast and Slow pointers meet, we can keep one pointer stationary and move the other until they meet again, counting the number of steps it takes.
  - **Start of Cycle**: Can you find the starting node of the cycle in a linked list? Once you've detected a cycle and calculated its length, you can reset the pointers to the head of the list, advance one pointer the length of the cycle steps forward, then move both pointers at the same speed. They'll meet at the start of the cycle.
  - **Happy Number**: A happy number is a number that eventually reaches 1 when replaced by the sum of the square of each digit. A number is considered unhappy if it loops endlessly in a cycle that does not include 1. Can you determine if a number is happy or not?
  - **Middle of the Linked List**: Can you find the middle node of a linked list in a single pass? The Fast and Slow pointers technique can be used here with the fast pointer moving twice as fast as the slow pointer.
  - **Palindrome Linked List**: Determine if a linked list is a palindrome. Using the Fast and Slow pointers technique, you can find the middle of the linked list, reverse the second half of the linked list, and then compare it with the first half.