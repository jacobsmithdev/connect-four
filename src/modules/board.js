const ROW_WIDTH = 5;
const COL_HEIGHT = 4;

// Format board as [row][col]
const board = Array(COL_HEIGHT).fill(null);
board.forEach((_, index) => board[index] = Array(ROW_WIDTH).fill(null));

function logBoard() {
    console.table(board);
}

function clearBoard() {
    board.forEach(row => row.fill(null));
}

function dropToken(token, col) {
    if (col > ROW_WIDTH) return false;

    const availableCells = [];

    for (let i = 0; i < COL_HEIGHT; i++) {
        if (!board[i][col]) {
            availableCells.push(i);
        }
    }
    
    if (!availableCells.length) return false;

    const lowestAvailableCell = availableCells[availableCells.length - 1];
    board[lowestAvailableCell][col] = token;
    return true;
}

export { logBoard, clearBoard, dropToken };