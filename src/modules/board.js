const ROW_WIDTH = 5;
const COL_HEIGHT = 4;
const WIN_LENGTH = 4;

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
        if (board[i][col] === null) {
            availableCells.push(i);
        }
    }
    
    if (!availableCells.length) return false;

    const lowestAvailableCell = availableCells[availableCells.length - 1];
    board[lowestAvailableCell][col] = token;
    return true;
}

function rowHasWinner(token) {
    const rowHasWinner = board.some(row => {
        for (let n = 0; n < ROW_WIDTH - WIN_LENGTH + 1; n++) {
            const subsetStart = n;
            const subsetEnd = n + ROW_WIDTH - 1;
            const subset = row.slice(subsetStart, subsetEnd);
            
            if (subset.every(item => item === token)) {
                return true;
            }
        }
    })

    return rowHasWinner;
}

function colHasWinner(token) {
    const cols = [];

    for (let colNum = 0; colNum < ROW_WIDTH; colNum++) {
        const col = board.map(row => row[colNum]);
        cols.push(col);
    }

    const colHasWinner = cols.some(col => {
        for (let n = 0; n < COL_HEIGHT - WIN_LENGTH + 1; n++) {
            const subsetStart = n;
            const subsetEnd = n + COL_HEIGHT;
            const subset = col.slice(subsetStart, subsetEnd);
            
            if (subset.every(item => item === token)) {
                return true;
            }
        }
    });

    return colHasWinner;
}

export { logBoard, clearBoard, dropToken };