/*
 * Knights Travails
 * Project Inspired by The Odin Project
 * https://www.theodinproject.com/lessons/javascript-knights-travails
 *
 * Author: Rohit Mehta (github.com/r0hitm)
 */

const assert = require("assert");

// Pos is an array of two numbers [x, y]
// where x and y are the coordinates of the chessboard
// Note: 0 <= x, y <= 7

// Returns true if this position is equal to the given position
const equals = (pos1, pos2) => {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
};


const knightMoves = (start, end) => {
    return searchPathIDS(start, end);
};

// Return the path from start to end as an array of positions using DFS
const searchPath = (start, end, visited = [], tovisit = [], maxDepth) => {
    if (equals(start, end)) {
        return visited;
    } else if (maxDepth === 0) {
        return undefined;
    } else {
        const moves = getNextPos(start).filter(pos => {
            return visited.every(visitedPos => {
                return equals(pos, visitedPos) === false;
            });
        });
        // look if any of the moves is the end
        const endMove = moves.find(move => equals(move, end));
        if (endMove !== undefined) {
            return visited;
        }
        tovisit.unshift(...moves);
        visited.push(start);
        return searchPath(tovisit.shift(), end, tovisit, visited, maxDepth - 1);
    }
}

const searchPathIDS = (start, end) => {
    let maxDepth = 1;
    while (true) {
        const path = searchPath(start, end, [], [], maxDepth);
        if (path !== undefined) {
            return [start, ...path, end];
        }
        maxDepth++;
    }
}


// Get next possible positions from the given position
const getNextPos = pos => {
    const [x, y] = pos;
    return [
        [x + 1, y + 2],
        [x + 1, y - 2],
        [x - 1, y + 2],
        [x - 1, y - 2],
        [x + 2, y + 1],
        [x + 2, y - 1],
        [x - 2, y + 1],
        [x - 2, y - 1],
    ].filter(p =>
        p.every(coord => coord >= 0 && coord <= 7 && equals(p, pos) === false)
    );
};


// TEST:
console.log(searchPathIDS([0,0], [0,0]));
console.log(searchPathIDS([0,0], [1,2]));
console.log(searchPathIDS([0,0], [3,3]));
console.log(searchPathIDS([3,3], [0,0]));
console.log(searchPathIDS([2,1], [0,0]));
console.log(searchPathIDS([1,2], [0,0]));
