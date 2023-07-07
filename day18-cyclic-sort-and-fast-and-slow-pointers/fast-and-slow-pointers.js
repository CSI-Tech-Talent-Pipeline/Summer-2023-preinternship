class Node {
  constructor(value, next=null) {
    this.value = value;
    this.next = next;
  }
}

function hasCycle(head) {
  let fast = head;
  let slow = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (fast === slow) {
      return true;
    }
  }
  return false;
}

function cycleLength(head) {
  let fast = head.next.next;
  let slow = head.next;
  let distance = 1;
  while (fast !== slow) {
    slow = slow.next;
    fast = fast.next.next;
    distance++;
  }
  return distance;
}
/*----------------------------------------------------------------
a _
^__|
fast = a
slow = a
distance = 1
loop condition a !== a => false
return 1

a b
^_|
fast = a
slow = b
distance = 1
loop condition = a !== b => true
slow = a
fast = a
distance = 2
loop condition = a !== b => false
return 2

a b c d 
  ^___|
slow = b
fast = c
distance = 1
loop condition true
slow = c
fast = b
distance = 2
loop condition true
slow = d
fast = d
distance = 3
loop condition false slow = d and fast = d
return 3

-----------------------------------------------------------------*/

/*----------------------------------------------------------------
1 2 3
  ^_|
fast = 1, slow = 1
loop starts
fast = 3, slow = 2
fast === slow => false
fast !== null && fast.next !== null => true
fast = 3, slow = 3
fast === slow => true
return true

1 2 3
fast = 1, slow = 1
loop starts
fast = 3, slow = 2
fast === slow => false
fast !== null && fast.next !== null => fast!== null is true, but fast.next === null so we get false
while loop terminates
return false
-----------------------------------------------------------------*/

module.exports = {
  hasCycle,
  cycleLength,
  Node
};
