/*
 * Knights Travails
 * Project Inspired by The Odin Project
 * https://www.theodinproject.com/lessons/javascript-knights-travails
 * 
 * Author: Rohit Mehta (github.com/r0hitm)
 */

// Pos is an array of two numbers [x, y]
// where x and y are the coordinates of the chessboard
// Note: 0 <= x, y <= 7

// Pos Pos -> Array[Pos]
// Return an array of Pos that a knight can make from start to end in least moves
const knightMoves = (start, end) => {
    // TODO
};


// Manual Tests
// if (knightMoves([0, 0], [1, 2]) !== [[0, 0], [1, 2]]) {
//     console.log("Test 1 Failed");
// }
// if (knightMoves([0, 0], [3, 3]) !== [[0, 0], [1, 2], [3, 3]]) {
//     console.log("Test 2 Failed");
// }
// if (knightMoves([3, 3], [0, 0]) !== [[3, 3], [1, 2], [0, 0]]) {
//     console.log("Test 3 Failed");
// }
// if (knightMoves([3, 3], [4, 3]) !== [[3, 3], [1, 2], [0, 0], [2, 1], [4, 2], [5, 4], [4, 3]]) {
//     console.log("Test 4 Failed");
// }