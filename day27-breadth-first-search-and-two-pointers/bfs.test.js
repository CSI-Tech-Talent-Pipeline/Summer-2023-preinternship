const { bfsTree, bfsGraph, Graph, Node } = require("./bfs.js");

describe("Breadth-First Search", () => {
  describe("BFS on Trees", () => {
    test("should return the node if it is found", () => {
      const root = new Node(1);
      root.children = [new Node(2), new Node(3), new Node(4)];
      root.children[0].children = [new Node(5), new Node(6)];

      expect(bfsTree(root, 5).value).toBe(5);
    });

    test("should return null if the node is not found", () => {
      const root = new Node(1);
      root.children = [new Node(2), new Node(3), new Node(4)];
      root.children[0].children = [new Node(5), new Node(6)];

      expect(bfsTree(root, 7)).toBeNull();
    });
  });

  describe("BFS on Graphs", () => {
    test("should return the node if it is found", () => {
      const graph = new Graph();
      graph.addVertex("1");
      graph.addVertex("2");
      graph.addVertex("3");
      graph.addVertex("4");
      graph.addVertex("5");
      graph.addVertex("6");
      graph.addEdge("1", "2");
      graph.addEdge("1", "3");
      graph.addEdge("1", "4");
      graph.addEdge("2", "5");
      graph.addEdge("2", "6");

      expect(bfsGraph(graph, "1", "5").value).toBe("5");
    });

    test("should return null if the node is not found", () => {
      const graph = new Graph();
      graph.addVertex("1");
      graph.addVertex("2");
      graph.addVertex("3");
      graph.addVertex("4");
      graph.addVertex("5");
      graph.addVertex("6");
      graph.addEdge("1", "2");
      graph.addEdge("1", "3");
      graph.addEdge("1", "4");
      graph.addEdge("2", "5");
      graph.addEdge("2", "6");

      expect(bfsGraph(graph, "1", "7")).toBeNull();
    });
  });
});
