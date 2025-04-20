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

function checkForWinner(token) {
    if (rowHasWinner(token) || colHasWinner(token) || diagonalHasWinner(token)) {
        return true;
    }
    return false;
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

function diagonalHasWinner(token) {
    const diagonals = [];
    
    for (let startCol = 0; startCol < ROW_WIDTH; startCol++) {
        let col = startCol;
        let row = 0;
        const diagonal = [];
        while (col < ROW_WIDTH && row < COL_HEIGHT) {
            diagonal.push(board[row][col]);
            col++;
            row++;
        }
        diagonals.push(diagonal);
    }
    
    for (let startCol = 0; startCol < ROW_WIDTH; startCol++) {
        let col = startCol;
        let row = 0;
        const diagonal = [];
        while (col < ROW_WIDTH && row < COL_HEIGHT) {
            diagonal.push(board[COL_HEIGHT - row - 1][col]);
            col++;
            row++;
        }
        diagonals.push(diagonal);
    }

    const filteredDiagonals = diagonals.filter(diagonal => diagonal.length >= WIN_LENGTH);

    const diagonalHasWinner = filteredDiagonals.some(diagonal => {
        for (let n = 0; n < diagonal.length; n++) {
            if (n + WIN_LENGTH > diagonal.length) break;
            const subsetStart = n;
            const subsetEnd = n + WIN_LENGTH;
            const subset = diagonal.splice(subsetStart, subsetEnd); 

            if (subset.every(item => item === token)) return true;
        } 
        return false;
    })

    return diagonalHasWinner;
}

export { logBoard, clearBoard, dropToken };