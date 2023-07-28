/* 
    1
   /|\
  2 3 4
   / \
  5   6
we're looking for the 6 node
Call Stack snapshots:
dfs(1) 1 is not 6 so call dfs on each child and check result
dfs(1) dfs(2) returns null
dfs(1) check next child
dfs(1) dfs(3) 3 is not 6 so call dfs on all children and check result
dfs(1) dfs(3) dfs(5) 5 is not 6 and has no children so return null
dfs(1) dfs(3) check next child
dfs(1) dfs(3) dfs(6) // we found it! return node from dfs(6)
dfs(1) dfs(3) // dfs(3) receives the return value from dfs(6) and returns it
dfs(1) // dfs(1) receives the return value from dfs(3) and returns it
empty
*/
const {
  search,
} = require("../day24-node-express-and-react-part2/job-application-tracker-api/routes/jobs");

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  depthFirstSearch(searchValue) {
    console.log(this);
    console.log("isMatch", this.value === searchValue);
    if (this.value === searchValue) {
      return this;
    }

    if (this.left) {
      const leftSearchResult = this.left.depthFirstSearch(searchValue);
      if (leftSearchResult) {
        return leftSearchResult;
      }
    }

    if (this.right) {
      const rightSearchResult = this.right.depthFirstSearch(searchValue);
      if (rightSearchResult) {
        return rightSearchResult;
      }
    }

    return null;
  }
}

const binaryTreeNode = new BinaryTree(1);
binaryTreeNode.left = new BinaryTree(2);
binaryTreeNode.right = new BinaryTree(3);
/* tree
  1
 / \
2   3
bfs(1)
bfs(1) bfs(2) return null
bfs(1)
bfs(1) bfs(3) return 3 node
bfs(1) retunr 3 node
*/

// console.log(binaryTreeNode.depthFirstSearch(3))

class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
  }

  depthFirstSearch(searchValue) {
    console.log(this);
    if (this.value === searchValue) {
      return this;
    }
    for (let child of this.children) {
      const searchResult = child.depthFirstSearch(searchValue);
      if (searchResult) {
        return searchResult;
      }
    }
    return null;
  }
}

const treeNode = new TreeNode(1);
[2, 3, 4].forEach((num) => treeNode.addChild(new TreeNode(num)));
[5, 6].forEach((num) => treeNode.children[1].addChild(new TreeNode(num)));

// console.log(treeNode);

/* 
    1
   /|\
  2 3 4
   / \
  5   6
*/

console.log(treeNode.depthFirstSearch(7));