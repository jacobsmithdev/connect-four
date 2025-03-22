const ROW_WIDTH = 5;
const COL_HEIGHT = 4;

const board = Array(ROW_WIDTH * COL_HEIGHT).fill(null);

function logBoard() {
    for (let rowNum = 0; rowNum < COL_HEIGHT; rowNum++) {
        const rowItems = [];
        const startIndex = rowNum * ROW_WIDTH;
        const endIndex = startIndex + ROW_WIDTH;
        
        for (let rowItem = startIndex; rowItem < endIndex; rowItem++) {
            rowItems.push(board[rowItem]);
        }
        
        console.log(rowItems);
    }
}

function clearBoard() {
    board.fill(null);
}

function dropToken(token, col) {
    if (col > ROW_WIDTH) return false;

    const availableCells = [];
    const NUM_BOARD_CELLS = ROW_WIDTH * COL_HEIGHT;

    let cellIndex = col; 
    while (cellIndex < NUM_BOARD_CELLS) {
        if (board[cellIndex] === null) {
            availableCells.push(cellIndex);
        }
        cellIndex += ROW_WIDTH;
    }

    if (!availableCells) return false;

    const lowestColCell = availableCells[availableCells.length -1]
    board[lowestColCell] = token;
    return true;
}