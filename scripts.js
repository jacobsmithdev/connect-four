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
