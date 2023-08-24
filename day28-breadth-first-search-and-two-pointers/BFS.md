# Breadth-First Search (BFS) in JavaScript

Breadth-First Search (BFS) is a fundamental algorithm in computer science used to explore nodes and edges of a graph or a tree. It traverses the graph or tree level by level from the source node and can be used to search for a specific value.

This README will guide you through the process of implementing BFS in JavaScript, a language that is increasingly popular in technical interviews. Don't worry if you're new to JavaScript; we will walk you through it step by step.

## Table of Contents
1. Introduction to Breadth-First Search
2. BFS Algorithm
3. Walking Through BFS on a Sample Tree
4. Queue Implementation in JavaScript
5. BFS Implementation in JavaScript
6. Conclusion

## 1. Introduction to Breadth-First Search
The BFS algorithm starts traversal from the root node (in case of a tree) or any arbitrary node (in case of a graph), and visits nodes in a level by level manner (i.e., visiting the ones closest to the root first). BFS uses a queue data structure to keep track of the nodes to visit next.

### Diagram
```
    1
   /|\ 
  2 3 4
 / \   
5   6   
```

Starting at node 1, BFS would visit the nodes in the following order: 1, 2, 3, 4, 5, 6.

## 2. BFS Algorithm
Here's a high-level description of the BFS algorithm:

1. Start by adding the root node into a queue.
2. remove a node and examine it.
    - If the element sought is found in this node, quit the search and return a result.
    - Otherwise add any successors (the direct child nodes) that have not yet been discovered.
3. If the queue is empty, every node on the graph or tree has been examined – quit the search and return "not found".
4. If the queue is not empty, repeat from Step 2.

## 3. Walking Through BFS on a Sample Tree
Now, let's walk through the BFS algorithm step by step using the tree from section 1 as an example. Let's say we're looking for the value 5:

* Step 1: add the root node into a queue. The queue is now [1].
* Step 2: remove a node from the queue. This is node 1. It's not the value we're looking for, so we add its children, nodes 2, 3, and 4. The queue is now [2,3,4].
* Step 3: remove a node from the queue. This is node 2. It's not the value we're looking for, so we add its children, nodes 5 and 6. The queue is now [3,4,5,6].
* Step 4: remove a node from the queue. This is node 3. It's not the value we're looking for, and it has no children. The queue is now [4,5,6].
* Step 5: remove a node from the queue. This is node 4. It's not the value we're looking for, and it has no children. The queue is now [5,6].
* Step 6: remove a node from the queue. This is node 5. It's the value we're looking for! We've found the value, so we quit the search and return node 5.

## 4. Queue Implementation in JavaScript
Before we can implement BFS, we need a queue data structure. Here's how you can implement a Queue class using a Linked List in JavaScript:

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.back = null;
  }

  isEmpty() {
    return !this.front;
  }

  add(value) {
    let node = new Node(value);
    if (this.isEmpty()) {
      this.front = this.back = node;
    } else {
      this.back.next = node;
      this.back = node;
    }
  }

  remove() {
    if (this.isEmpty()) {
      return null;
    }
    let value = this.front.value;
    this.front = this.front.next;
    return value;
  }
}
```

## 5. BFS Implementation in JavaScript
Now that we have a queue, let's implement BFS on a Tree structure. We'll start with a function for searching a tree where each node can have multiple children.

Sure, let's break down the `bfsTree` algorithm into smaller chunks of code and walk through each part.

**Step 1: Function Declaration**
```javascript
function bfsTree(root, searchValue) {
  
}
```
We declare a function `bfsTree` that takes two arguments: `root`, which is the root node of the tree we'll be searching through, and `searchValue`, which is the value we're looking for in the tree.

**Step 2: Queue Initialization**
```javascript
function bfsTree(root, searchValue) {
  let queue = new Queue();
  queue.add(root);
}
```
Next, we initialize a new instance of our Queue class and add the root node. BFS uses a queue to keep track of the nodes we need to visit. We start with the root node because it's the starting point for our search.

**Step 3: BFS Loop**
```javascript
function bfsTree(root, searchValue) {
  let queue = new Queue();
  queue.add(root);

  while (!queue.isEmpty()) {
    let currentNode = queue.remove();

    // ... more code to come ...
  }
}
```
Then we start a loop that continues as long as the queue is not empty. In each iteration of the loop, we remove a node from the queue and assign it to `currentNode`. This node is the one we'll be examining in the current step of the algorithm.

**Step 4: Node Examination**
```javascript
function bfsTree(root, searchValue) {
  let queue = new Queue();
  queue.add(root);

  while (!queue.isEmpty()) {
    let currentNode = queue.remove();

    if (currentNode.value === searchValue) {
      console.log("Found the node!");
      return currentNode;
    }

    // ... more code to come ...
  }
}
```
Inside the loop, we first check if the value of `currentNode` is the value we're searching for. If it is, we've found the node we're looking for, so we log a message and return `currentNode`. This ends the function and the search.

**Step 5: add Children**
```javascript
function bfsTree(root, searchValue) {
  let queue = new Queue();
  queue.add(root);

  while (!queue.isEmpty()) {
    let currentNode = queue.remove();

    if (currentNode.value === searchValue) {
      console.log("Found the node!");
      return currentNode;
    }

    for (let child of currentNode.children) {
      queue.add(child);
    }
  }

  console.log("Node not found!");
  return null;
}
```
If `currentNode` is not the node we're looking for, we add all of its children. This is because in BFS, after examining a node, we visit all of its neighbors (or children in the case of a tree) next. We do this using a `for...of` loop to iterate over the `children` array of `currentNode`.

Finally, if we've exited the loop, it means we've examined all nodes in the tree and haven't found the node we're looking for. So we log a message and return `null` to indicate that the search value was not found in the tree.

And that's it! You've now walked through the implementation of the Breadth-First Search algorithm on a tree in JavaScript.

```javascript
function bfsTree(root, searchValue) {
  let queue = new Queue();
  queue.add(root);

  while (!queue.isEmpty()) {
    let currentNode = queue.remove();

    console.log("Visiting node: ", currentNode.value);

    if (currentNode.value === searchValue) {
      console.log("Found the node!");
      return currentNode;
    }

    for (let child of currentNode.children) {
      queue.add(child);
    }
  }

  console.log("Node not found!");
  return null;
}
```
### Modify the Algorithm to work on a Graph

Next, let's modify this function to search a graph. In a graph, we need to keep track of visited nodes to prevent cycles.

Before we can build this algorithm, we'll need an implementation of two classes: `Vertex` and `Graph`.

```javascript
class Vertex {
  constructor(value) {
    this.value = value;
    this.neighbors = [];
  }
}

class Graph {
  constructor() {
    this.vertices = [];
  }

  addVertex(value) {
    this.vertices.push(new Vertex(value));
  }

  addEdge(value1, value2) {
    const vertex1 = this.vertices.find(v => v.value === value1);
    const vertex2 = this.vertices.find(v => v.value === value2);
    vertex1.neighbors.push(vertex2);
    vertex2.neighbors.push(vertex1); 
    // this is an undirected graph because the
    // edge is connecting vertices in both 
    // directions. We can only add vertex2 to
    // vertex1's neighbors to make it a directed 
    // graph
  }
  
  getVertex(value) {
    return this.vertices.find(v => v.value === value);
  }
}
```

Let's break down the `bfsGraph` algorithm into smaller chunks of code and walk through each part.

**Step 1: Function Declaration**
```javascript
function bfsGraph(graph, startValue, searchValue) {
  
}
```
We declare a function `bfsGraph` that takes three arguments: `graph`, which is the graph we'll be searching through, `startValue`, which is the value of the vertex we start from, and `searchValue`, which is the value we're looking for in the graph.

**Step 2: Starting Vertex and Queue Initialization**
```javascript
function bfsGraph(graph, startValue, searchValue) {
  const startVertex = graph.getVertex(startValue);
  const queue = new Queue();
  queue.add(startVertex);
}
```
We first get the starting vertex from the graph using the `getVertex` method and the `startValue`. Then we initialize a new instance of our Queue class and add the starting vertex to the queue. BFS uses a queue to keep track of the vertices we need to visit. We start with the `startVertex` because it's the starting point for our search.

**Step 3: Set for Visited Vertices**
```javascript
function bfsGraph(graph, startValue, searchValue) {
  const startVertex = graph.getVertex(startValue);
  const queue = new Queue();
  queue.add(startVertex);
  
  const visited = new Set();
  visited.add(startVertex);
}
```
We create a `Set` called `visited` and add `startVertex` to it. In a graph, unlike a tree, the same vertex can be reached from multiple vertices. Therefore, we need a way to track which vertices have already been visited to avoid visiting the same vertex more than once and to avoid infinite loops in case of cycles in the graph.

**Step 4: BFS Loop**
```javascript
function bfsGraph(graph, startValue, searchValue) {
  let startVertex = graph.getVertex(startValue);
  let queue = new Queue();
  queue.add(startVertex);
  
  let visited = new Set();
  visited.add(startVertex);

  while (!queue.isEmpty()) {
    let currentVertex = queue.remove();

    // ... more code to come ...
  }
}
```
Next, we start a loop that continues as long as the queue is not empty. In each iteration of the loop, we remove a vertex from the queue and assign it to `currentVertex`. This vertex is the one we'll be examining in the current step of the algorithm.

**Step 5: Vertex Examination**
```javascript
function bfsGraph(graph, startValue, searchValue) {
  let startVertex = graph.getVertex(startValue);
  let queue = new Queue();
  queue.add(startVertex);
  
  let visited = new Set();
  visited.add(startVertex);

  while (!queue.isEmpty()) {
    let currentVertex = queue.remove();

    if (currentVertex.value === searchValue) {
      console.log("Found the vertex!");
      return currentVertex;
    }

    // ... more code to come ...
  }
}
```
Inside the loop, we first check if the value of `currentVertex` is the value we're searching for. If it is, we've found the vertex we're looking for, so we log a message and return `currentVertex`. This ends the function and the search.

**Step 6: Enqueue Neighbors**
```javascript
function bfsGraph(graph, startValue, searchValue) {
  let startVertex = graph.getVertex(startValue);
  let queue = new Queue();
  queue.add(startVertex);
  
  let visited = new Set();
  visited.add(startVertex);

  while (!queue.isEmpty()) {
    let currentVertex = queue.remove();

    if (currentVertex.value === searchValue) {
      console.log("Found the vertex!");
      return currentVertex;
    }

    for (let neighbor of currentVertex.neighbors) {
      if (!visited.has(neighbor)) {
        queue.add(neighbor);
        visited.add(neighbor);
      }
    }
  }

  console.log("Vertex not found!");
  return null;
}
```
If `currentVertex` is not the vertex we're looking for, we queue up all of its neighbors that haven't been visited yet. This is because in BFS, after examining a vertex, we visit all of its neighbors next. We do this using a `for...of` loop to iterate over the `neighbors` array of `currentVertex`.

Before add a neighbor to the queu, we check if it's in the `visited` set. If it is, it means we've already visited it, so we skip it. If it's not, we enqueue it and add it to the `visited` set.

Finally, if we've exited the loop, it means we've examined all vertices in the graph that are connected to the start vertex haven't found the vertex we're looking for. So we log a message and return `null` to indicate that the search value was not found in the graph.

And that's it! You've now walked through the implementation of the Breadth-First Search algorithm on a graph in JavaScript.

## 6. Conclusion
Congratulations! You have just implemented the BFS algorithm in JavaScript. This understanding will be crucial in your technical interviews, as many questions involve traversing or searching trees and graphs.

Breadth-First Search is a widely applicable algorithm and is often used in many types of interview problems. Here are some example problems where BFS would be a good technique to consider:

1. **Shortest Path in Unweighted Graph**: BFS can be used to find the shortest path between two nodes in an unweighted graph. This is because BFS visits nodes level by level, starting from the source node, so the first time a node is discovered during the traversal, that distance from the source gives the shortest path.

2. **Connected Components in a Graph**: If you want to find out the connected components of an undirected graph, you can start a BFS from every unvisited node. The BFS will mark all nodes reachable from the source, and that constitutes one connected component. This process can be repeated for all unvisited nodes, and the number of times the BFS is done gives the number of connected components.

3. **Binary Tree Level Order Traversal**: BFS can be used to traverse a binary tree level by level. Starting from the root, we add each node's children to the queue and process nodes from the queue one by one.

4. **Find the Distance of the Nearest Cell Having 1 in a Binary Matrix**: Given a matrix of 0s and 1s, use BFS to find the minimum distance of 1 for each cell in the matrix.

5. **Flood Fill Algorithm**: In image processing, the flood fill algorithm is used to determine the area connected to a given node in a multi-dimensional array. BFS can be used to implement this algorithm.

6. **Clone a Graph**: BFS can be used to clone (make a copy of) a graph. Starting from a given node, visit each node once and create a copy of it.

7. **Navigating a Maze**: Given a 2D grid representing a maze with open spaces and walls, BFS can be used to find the shortest path from a starting location to a goal location.

8. **Check for Path in a Graph**: Given a directed graph, find if there is a path between two nodes.

Remember, the applicability of BFS is vast, and these are just some examples. There are numerous other problem scenarios where BFS is the right tool for the job.

Practice BFS on a variety of tree and graph structures to solidify your understanding. With enough practice, you'll be able to implement BFS in your sleep!