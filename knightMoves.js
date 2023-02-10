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

// Returns the shortest path from start to end of the knight
// using Iterative Deepening Search
const knightMoves = (start, end) => {
    let maxDepth = 1;
    while (true) {
        const path = searchPath(start, end, maxDepth);
        if (path !== undefined) {
            return [...path, end];
        }
        maxDepth++;
    }
};

// Return the path from start to end as an array of positions using DFS
const searchPath = (start, end, maxDepth, visited = []) => {
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

        visited.push(start);
        const res = moves.map(pos => {
            // remove the positions that have been traversed in the move
            const index = visited.findIndex(v => equals(v, start));
            if (index !== -1) {
                visited.splice(index + 1);
            }
            const path = searchPath(pos, end, maxDepth - 1, visited);
            if (path !== undefined) {
                return path;
            }
        });
        assert(Array.isArray(res));

        return res.reduce((acc, val) => {
            if (val === undefined) {
                return acc;
            } else if (acc === undefined) {
                return val;
            } else return acc.length > val.length ? val : acc;
        });
    }
};

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
console.log(knightMoves([0, 0], [0, 0]));
console.log(knightMoves([0, 0], [1, 2]));
console.log(knightMoves([0, 0], [3, 3]));
console.log(knightMoves([3, 3], [0, 0]));
console.log(knightMoves([2, 1], [0, 0]));
console.log(knightMoves([1, 2], [0, 0]));
