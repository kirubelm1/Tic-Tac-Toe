document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const restartBtn = document.querySelector('.restartbtn');
    const playerText = document.querySelector('.Playertext');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;
    const PLAYER_X_WON = 'Player X has won!';
    const PLAYER_O_WON = 'Player O has won!';
    const TIE = 'Game is a tie!';
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYER_X_WON : PLAYER_O_WON);
            isGameActive = false;
            return;
        }
        if (!board.includes(''))
           announce(TIE);
    }
    const announce = (type) => {
        switch(type){
            case PLAYER_O_WON:
                playerText.innerHTML = 'Player <span class="playerO">O</span> has won!';
                break;
            case PLAYER_X_WON:
                playerText.innerHTML = 'Player <span class="playerX">X</span> has won!';
                break;
            case TIE:
                playerText.innerText = 'Game is a tie!';
        }
        playerText.classList.add('show');
    };
    const isValidAction = (box) => {
        if (box.innerText === 'X' || box.innerText === 'O'){
            return false;
        }
        return true;
    };
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }
    const changePlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (isGameActive) {
            playerText.innerHTML = `It's <span class="player${currentPlayer}">${currentPlayer}</span>'s turn`;
        }
    }
    const userAction = (box, index) => {
        if(isValidAction(box) && isGameActive) {
            box.innerText = currentPlayer;
            box.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            if (isGameActive) {
                changePlayer();
            }
        }
    };
    boxes.forEach( (box, index) => {
        box.addEventListener('click', () => userAction(box, index));
    });
    const restartBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        playerText.classList.remove('show');
        if (currentPlayer === 'O') {
            changePlayer();
        }
        boxes.forEach(box => {
            box.innerText = '';
            box.classList.remove('playerX');
            box.classList.remove('playerO');
        });
    };
    restartBtn.addEventListener('click', restartBoard);
});
alert("Let the game start!")