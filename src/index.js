'use strict';
const tacContainer = document.querySelector('.tac-container');
const rows = document.querySelectorAll('.row');
const playerWin = document.querySelector('.player-winner');
const resetGame = document.querySelector('.reset-game-btn');

const player_1 = document.querySelector('.player-1');
const player_2 = document.querySelector('.player-2');
const winner = document.querySelector('.winner');
const draw = document.querySelector('.draw');

const positons = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
];

let count;
let rowSum;
let colSum;
let diag;
let reverseDiag;
let isWinDraw;
let playing;

function initializeGame() {
  count = 0;
  rowSum = new Array(3).fill(0);
  colSum = new Array(3).fill(0);
  diag = 0;
  reverseDiag = 0;
  isWinDraw = false;
  playing = 0; // 1 or 0
  player_1.classList.add('x');
  player_2.classList.remove('o');
}
resetGame.addEventListener('click', function () {
  rows.forEach(row => {
    row.classList.remove('x');
    row.classList.remove('o');
  });
  playerWin.classList.remove(`${playing ? 'x' : 'o'}`);
  winner.classList.add('hidden');
  draw.classList.add('hidden');
  initializeGame();
});

const ShowWinner = function (currPlayer) {
  winner.classList.remove('hidden');
  playerWin.textContent = currPlayer < 0 ? 2 : 1;
  playerWin.classList.add(`${playing ? 'x' : 'o'}`);
  console.log(currPlayer);
  isWinDraw = true;
  document.documentElement.style.setProperty('--pointer', 'default');
  // playerWin.classList.add(`${playing ? 'x' : 'o'}`);
};

const showDraw = function () {
  isWinDraw = true;
  document.documentElement.style.setProperty('--pointer', 'default');
  draw.classList.remove('hidden');
};

//
const tictacMoves = function (row, col, player) {
  let currPlayer = player === 1 ? +1 : -1;
  rowSum[row] += currPlayer;
  colSum[col] += currPlayer;
  count++;
  if (row === col) diag += currPlayer;
  if (row === 2 - col) reverseDiag += currPlayer;

  if (
    Math.abs(rowSum[row]) === 3 ||
    Math.abs(colSum[col]) === 3 ||
    Math.abs(diag) === 3 ||
    Math.abs(reverseDiag) === 3
  ) {
    ShowWinner(currPlayer);
  } else if (count === 9) {
    showDraw();
  }
};

const switchPlayer = function (row) {
  playing = playing ? 0 : 1;
  row.classList.add(`${playing ? 'x' : 'o'}`);
  player_1.classList.toggle('x');
  player_2.classList.toggle('o');
  let [i, j] = positons[row.id];
  tictacMoves(i, j, playing);
};

function startGame() {
  tacContainer.addEventListener('click', function (e) {
    if (!isWinDraw) {
      if (
        e.target.classList.contains('row') &&
        !e.target.classList.contains('x') &&
        !e.target.classList.contains('o')
      ) {
        const row = e.target.closest('.row');
        switchPlayer(row);
      }
    }
  });
}
initializeGame();
startGame();
/*
@param player either 0 or 1
@param row is the move's row Index
@param col is the the moves column index
*/
// getBoard()
//getWinner()
//getCurrent player()
//make move()
