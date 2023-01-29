/*
 * Binary Search Tree
 *
 * Author: Rohit Mehta (@r0hitm)
 */

// Note: Designed for unique and numeric values
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = buildTree(arr);
    }
}

// Helper function to build the tree
// Assume: arr is sorted and has unique values
const buildTree = arr => {
    if (arr.length === 0) return null;
    let mid = Math.floor(arr.length / 2);
    let node = new Node(arr[mid]);
    node.left = buildTree(arr.slice(0, mid));
    node.right = buildTree(arr.slice(mid + 1));
    return node;
}

// Helper function to print the tree
// Tree is printed in the following format:
// ┌── 10
// │   └── 5
// │       └── 2
// │           └── 1
// └── 15
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};


// Manual testing
let arr = [1, 2, 5, 10, 15, 1, 2, 5, 10, 15];
arr.sort((a, b) => a - b);
arr = [...new Set(arr)]; // Remove duplicates using Sets and spread operator
console.log(arr);
let tree = new Tree(arr);
console.log(tree.root);
prettyPrint(tree.root);