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

    buildTree(arr) {
        if (arr.length === 0) return null;
        arr.sort((a, b) => a - b); // Sort the array
        // remove duplicates
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] === arr[i + 1]) {
                arr.splice(i, 1);
                i--;
            }
        }
        let mid = Math.floor(arr.length / 2);
        let node = new Node(arr[mid]);
        node.left = buildTree(arr.slice(0, mid));
        node.right = buildTree(arr.slice(mid + 1));
        return node;
    }
}