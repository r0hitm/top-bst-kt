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

    // Insert a value into the tree
    insert(value) {
        let node = this.root;
        while (node !== null) {
            if (value < node.value) {
                if (node.left === null) {
                    node.left = new Node(value);
                    return;
                }
                node = node.left;
            } else {
                if (node.right === null) {
                    node.right = new Node(value);
                    return;
                }
                node = node.right;
            }
        }
    }

    // Delete a value from the tree
    delete(value) {
        let node = this.root;
        let parent = null;
        while (node !== null) {
            if (value === node.value) {
                // Case 1: Node has no children
                if (node.left === null && node.right === null) {
                    if (parent === null) {
                        this.root = null;
                        return;
                    }
                    if (parent.left === node) {
                        parent.left = null;
                    } else {
                        parent.right = null;
                    }
                    return;
                }

                // Case 2: Node has one child
                if (node.left === null) {
                    if (parent === null) {
                        this.root = node.right;
                        return;
                    }
                    if (parent.left === node) {
                        parent.left = node.right;
                    } else {
                        parent.right = node.right;
                    }
                    return;
                }
                if (node.right === null) {
                    if (parent === null) {
                        this.root = node.left;
                        return;
                    }
                    if (parent.left === node) {
                        parent.left = node.left;
                    } else {
                        parent.right = node.left;
                    }
                    return;
                }

                // Case 3: Node has two children
                let min = node.right;
                let minParent = node;
                while (min.left !== null) {
                    minParent = min;
                    min = min.left;
                }
                node.value = min.value;
                if (minParent.left === min) {
                    minParent.left = min.right;
                } else {
                    minParent.right = min.right;
                }
                return;
            }
            parent = node;
            if (value < node.value) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
    }

    // Search for a value in the tree
    search(value) {
        let node = this.root;
        while (node !== null) {
            if (value === node.value) {
                return true;
            }
            if (value < node.value) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        return false;
    }

    find(value) {
        return this.search(value);
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

const levelOrder = (node, func) => {
    let queue = [node];
    let arr = [];
    while (queue.length > 0) {
        let current = queue.shift();
        if (func !== undefined) {
            func(current);
        } else {
            arr.push(current.value);
        }
        if (current.left !== null) {
            queue.push(current.left);
        }
        if (current.right !== null) {
            queue.push(current.right);
        }
    }
};

const inOrder = (node, func) => {
    if (node === null) return;
    inOrder(node.left, func);
    if (func !== undefined) {
        func(node);
    } else {
        console.log(node.value);
    }
    inOrder(node.right, func);
};

const preOrder = (node, func) => {
    if (node === null) return;
    if (func !== undefined) {
        func(node);
    } else {
        console.log(node.value);
    }
    preOrder(node.left, func);
    preOrder(node.right, func);
};

const postOrder = (node, func) => {
    if (node === null) return;
    postOrder(node.left, func);
    postOrder(node.right, func);
    if (func !== undefined) {
        func(node);
    } else {
        console.log(node.value);
    }
};

const height = node => {
    if (node === null) return 0;
    return 1 + Math.max(height(node.left), height(node.right));
};

// note: depth is similar to height,
//      difference is that depth is calculated from the given node 
//      and not the root node as in height
const depth = node => {
    height(node);
}

const isBalanced = node => {
    if (node === null) return true;
    let leftHeight = height(node.left);
    let rightHeight = height(node.right);
    return Math.abs(leftHeight - rightHeight) <= 1 && isBalanced(node.left) && isBalanced(node.right);
};

// Rebalance the tree by taking the values in-order and building a new tree
// Returns the root node of the new tree, the original tree is not modified
const rebalance = node => {
    let arr = [];
    inOrder(node, n => arr.push(n.value));
    return buildTree(arr);
};

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


// // Manual testing
// let arr = [1, 2, 5, 10, 15, 1, 2, 5, 10, 15];
// arr.sort((a, b) => a - b);
// arr = [...new Set(arr)]; // Remove duplicates using Sets and spread operator
// // console.log(arr);
// let tree = new Tree(arr);
// // console.log(tree.root);
// prettyPrint(tree.root);
// tree.insert(20);
// prettyPrint(tree.root);
// tree.delete(15);
// prettyPrint(tree.root);
// levelOrder(tree.root, node => console.log(node.value));
// console.log(isBalanced(tree.root));
// // console.log(rebalance(tree.root));
// // prettyPrint(tree.root);