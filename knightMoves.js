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

const knightMoves = (start, end) => {
    return buildPath(start, end, [start]);
};

// Return the shortest path from start to end as an array of positions
// Note: knightMoves helper. Not to be used directly
const buildPath = (start, end, visited = []) => {
    // DEBUG CODE ----------------
    console.log("23: Entering buildPath: ", {start, end, visited});
    // --------------------

    if (equals(start, end)) {
        return visited;
    } else {
        const moves = getNextPos(start).filter(pos => {
            return visited.every(visitedPos => {
                return equals(pos, visitedPos) === false;
            });
        });
        // console.log("34: ", {start, moves});
        // return;
        const shortestPath = moves.map(move => {
            return buildPath(move, end, visited.concat([move]));
        });
        // console.log("39: ", shortestPath);
        return;
        return shortestPath.reduce((a, b) => {
            return a.length < b.length ? a : b;
        });
    }
};

// DEBUG NOTE: This MIGHT not work
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

// DEBUG NOTE: This function WORKS
// Returns true if this position is equal to the given position
const equals = (pos1, pos2) => {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
};

// console.log(buildPath([3, 3], [4, 3]));
console.log("72: ", buildPath([0, 0], [1, 2], [[0, 0]]));
// console.log(buildPath([3, 3], [0, 0]));

// console.log(knightMoves([3, 3], [4, 3]));
// console.log(knightMoves([0, 0], [1, 2]));
// console.log(knightMoves([3, 3], [0, 0]));

// const k = new KnightPos([3, 4]);
// assert.deepEqual(k.getCurrentPos(), [3, 4]);
// assert.deepEqual(k.getNextPos(), [
//     [4, 6],
//     [4, 2],
//     [2, 6],
//     [2, 2],
//     [5, 5],
//     [5, 3],
//     [1, 5],
//     [1, 3],
// ]);
// console.log("All tests passed!");
// console.log(k.getNextPos());
// console.log(k.getCurrentPos());
// const moves = k.getMoves();
// console.log('-------moves---------');
// console.log(moves);
// console.log('--------moves[0].getCurrentPos()--------');
// console.log(moves[0].getCurrentPos());
// console.log('-------moves[0].getNextPos()---------');
// console.log(moves[0].getNextPos());
