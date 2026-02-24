const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

const board = [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
let turn = CROSS;

let victory = false;

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function checkVictory(sign) {
    for (let row = 0; row < 3; row++) {
        let all = true;
        for (let col = 0; col < 3; col++){
            if (board[row][col] !== sign) all = false;
        }
        if (all) return true;
    }

    for (let col = 0; col < 3; col++){
        let all = true;
        for (let row = 0; row < 3; row++) {
            if (board[row][col] !== sign) all = false;
        }
        if (all) return true;
    }

    let allDiag1 = true;
    for (let i = 0; i < 3; i++) {
        if (board[i][i] !== sign) allDiag1 = false;
    }
    if (allDiag1) return true;

    let allDiag2 = true;
    for (let i = 0; i < 3; i++) {
        if (board[2 - i][i] !== sign) allDiag2 = false;
    }
    if (allDiag2) return true;
}

function outOfSteps() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === EMPTY) return false;
        }
    }
    return true;
}

function cellClickHandler (row, col) {
    console.log(`Clicked on cell: ${row}, ${col}`);
    if (victory) return;
    if (board[row][col] !== EMPTY) return;
    board[row][col] = turn;

    renderSymbolInCell(turn, row, col);

    if (outOfSteps()) {
        alert("Победила дружба");
        return;
    }

    if (checkVictory(CROSS)){
        colorCells(CROSS);
        alert("Победили крестики");
        victory = true;
    }
    if (checkVictory(ZERO)){
        colorCells(ZERO);
        alert("Победили нолики");
        victory = true;
    }

    turn = turn === CROSS ? ZERO : CROSS;
}

function colorCells(sign) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] !== sign) continue;
            let cell = findCell(i, j);
            cell.style.color = "red";
        }
    }
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = EMPTY;
            renderSymbolInCell(EMPTY, i, j);
        }
    }
    turn = CROSS;
    victory = false;
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
