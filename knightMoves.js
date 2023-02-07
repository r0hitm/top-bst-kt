/*
 * Knights Travails
 * Project Inspired by The Odin Project
 * https://www.theodinproject.com/lessons/javascript-knights-travails
 *
 * Author: Rohit Mehta (github.com/r0hitm)
 */

const assert = require("assert");

//-----------------------------------------------------------------------------------------------
// Notes from Discord discussions:
// We know the starting position. We can calculate the positions the knight can move to from the
// start (I'll call these depth 1 positions, with depth 0 being the start).
// Are any of these the destination? If so, that's good, we made it in a single move.
// But if not, we can say okay, now what are all the places we can get to from the depth 1
// positions -- these would naturally represent places the knight can reach in 2 moves.
// And then you follow the same logic for where it can go in 3 moves, 4 moves, etc.

// This should sound similar to one of your traversal algorithms you learned on the binary search tree project.

// I need to do a BFS here.
//-----------------------------------------------------------------------------------------------

// Pos is an array of two numbers [x, y]
// where x and y are the coordinates of the chessboard
// Note: 0 <= x, y <= 7

// Pos Pos -> Array[Pos]
// Return an array of Pos that a knight can make from start to end in least moves
const knightMoves = (start, end) => {
    return knightMovesHelper(start, end, [start]);
};

// Pos Pos Array[Pos] -> Array[Pos]
// Return an array of Pos that a knight can make from start to end in least moves
const knightMovesHelper = (start, end, visited = []) => {
    // console.log(visited);
    // console.log(start);
    if (start[0] === end[0] && start[1] === end[1]) {
        return visited;
    } else {
        const nextPossibleMoves = moveKnight(start, visited).filter(
            p => p.length > 0
        ); // that are not in visited
        console.log(nextPossibleMoves);

        assert(nextPossibleMoves !== undefined);

        const paths = nextPossibleMoves.map(p => {
            // console.log(p);
            const res = knightMovesHelper(p, end, visited.concat([p]));
            assert(res !== undefined);
            return res;
        });
        assert(paths !== undefined);
        // console.log(paths);

        // return shortestPath;
    }
};

// Array[Pos] Pos -> Boolean
// Return true if any of the pos in the array is the end
const reachedEnd = (nextPos, end) => {
    for (let i = 0; i < nextPos.length; i++) {
        const pos = nextPos[i];
        if (pos[0] === end[0] && pos[1] === end[1]) {
            return true;
        }
    }
    return false;
};

// Pos (listoƒ Pos) -> Array[Pos]
// Return an array of all possible positions a knight can move to from pos
const moveKnight = (pos, visited = []) => {
    // console.log(visited);
    const [x, y] = pos;
    const moves = [
        [x + 1, y + 2],
        [x + 1, y - 2],
        [x - 1, y + 2],
        [x - 1, y - 2],
        [x + 2, y + 1],
        [x + 2, y - 1],
        [x - 2, y + 1],
        [x - 2, y - 1],
    ].filter(p => {
        const [x, y] = p;
        return (
            x >= 0 &&
            x <= 7 &&
            y >= 0 &&
            y <= 7 &&
            pos[0] !== x &&
            pos[1] !== y &&
            (_ => {
                for (let i = 0; i < visited.length; i++) {
                    const v = visited[i];
                    if (v[0] === x && v[1] === y) {
                        return false;
                    }
                }
                return true;
            })()
        );
    });

    return moves;
};

// Manual Tests
// for (let i = 0; i < 8; i++) {
//     for (let j = 0; j < 8; j++) {
//         console.log(moveKnight([i, j], [ [ 6, 5 ], [ 5, 6 ] ]));
//     }
// }

// console.log(knightMoves([0, 0], [0, 0]));
// const test1 = knightMoves([0, 0], [1, 2]);
// const test2 = knightMoves([0, 0], [3, 3]);
const test3 = knightMoves([3, 3], [0, 0]);
// const test4 = knightMoves([3, 3], [4, 3]);
// console.log(test1);
// console.log(test2);
console.log(test3);
// console.log(test4);
