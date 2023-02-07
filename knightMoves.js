/*
 * Knights Travails
 * Project Inspired by The Odin Project
 * https://www.theodinproject.com/lessons/javascript-knights-travails
 *
 * Author: Rohit Mehta (github.com/r0hitm)
 */

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
const makePos = (x, y) => [x, y];
// console.log(makePos(2, 2));

// Pos Pos -> Array[Pos]
// Return an array of Pos that a knight can make from start to end in least moves
const knightMoves = (start, end) => {
    return knightMovesHelper(start, end, [start]);
};

// Pos Pos Array[Pos] -> Array[Pos]
// Return an array of Pos that a knight can make from start to end in least moves
const knightMovesHelper = (start, end, visited) => {
    if (start[0] === end[0] && start[1] === end[1]) {
        return visited;
    } else {
        const nextPos = moveKnight(start, visited);

        // Check if any of the nextPos is the end
        for (let i = 0; i < nextPos.length; i++) {
            const p = nextPos[i];
            if (p[0] === end[0] && p[1] === end[1]) {
                return visited.concat([p]);
            }
        }

        // If none of the nextPos is the end, then we need to check the nextPos of the nextPos
        for (let i = 0; i < nextPos.length; i++) {
            const pos = nextPos[i];
            return knightMovesHelper(pos, end, visited.concat([pos]));
        }
    }
};

// Pos (listoƒ Pos) -> Array[Pos]
// Return an array of all possible positions a knight can move to from pos
const moveKnight = (pos, visited = []) => {
    const [x, y] = pos;
    const moves = [
        makePos(x + 1, y + 2),
        makePos(x + 1, y - 2),
        makePos(x - 1, y + 2),
        makePos(x - 1, y - 2),
        makePos(x + 2, y + 1),
        makePos(x + 2, y - 1),
        makePos(x - 2, y + 1),
        makePos(x - 2, y - 1),
    ];
    return moves.filter(p => {
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
// console.log(test1);
// console.log(test2);
console.log(test3);
// }
// if (knightMoves([3, 3], [4, 3]) !== [[3, 3], [1, 2], [0, 0], [2, 1], [4, 2], [5, 4], [4, 3]]) {
//     console.log("Test 4 Failed");
// }
