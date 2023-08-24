class Node { 
  constructor(value, children=[]) {
    this.value = value;
    this.children = children;
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
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.front = this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode;
    }
  }

  remove() {
    if (this.isEmpty()) {
      return null;
    }
    const value = this.front.value;
    this.front = this.front.next;
    return value;
  }
}

function bfsTree(root, searchValue) {
  
}


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
  }
  
  getVertex(value) {
    return this.vertices.find(v => v.value === value);
  }
}

function bfsGraph(graph, startValue, searchValue) {
  
}

module.exports = {
  bfsTree,
  bfsGraph,
  Queue,
  Graph,
  Node
}
