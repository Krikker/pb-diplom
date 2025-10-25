let players = ['x', 'o'];
let activePlayer = 0;
let board;
let size;

function startGame() {
    size = prompt("Введите размер поля (например, 3 для 3×3):");
    size = Number(size);
    if (size < 3) {
        alert("Пожалуйста, введите число от 3. Так в крестики-нолики не играют)");
        return startGame();
    }
    board = [];
    for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
            board[i][j] = '';
        }
    }
    activePlayer = Math.floor(Math.random() * 2);
    renderBoard(board);
}

function click(row, column) {
    if (board[row][column] !== '') {
        return;
    };
    board[row][column] = players[activePlayer];
    if (checkWin(row, column)) {
        showWinner(activePlayer);
        return;
    }
    if (isDraw()) {
        showDraw();
        return;
    }
    activePlayer = 1 - activePlayer;
    renderBoard(board);
}

function checkWin(row, column) {
    let player = board[row][column];
    let isWin = true;
    for (let i = 0; i < size; i++) {
        if (board[i][column] != player) {
            isWin = false;
            break;
        }
    }
    if (isWin) return true;
    isWin = true;
    for (let j = 0; j < size; j++) {
        if (board[row][j] != player) {
            isWin = false;
            break;
        }
    }
    if (isWin) return true;
    if (row === column) {
        isWin = true;
        for (let k = 0; k < size; k++) {
            if (board[k][k] != player) {
                isWin = false;
                break;
            }
        }
        if (isWin) return true;
    }
    if (row + column === size - 1) {
        isWin = true;
        for (let k = 0; k < size; k++) {
            if (board[k][(size-1)-k] != player) {
                isWin = false;
                break;
            }
        }
        if (isWin) return true;
    }
    return false;
}

function isDraw() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

function showDraw() {
    let header = modalEl.getElementsByTagName('h2')[0];
    header.textContent = `Ничья!`;
    modalEl.classList.remove('hidden');
}