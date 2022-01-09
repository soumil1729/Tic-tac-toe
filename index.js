'use strict';
const tacContainer = document.querySelector('.tac-container');
const rows = document.querySelectorAll('.row');
const playerWin = document.querySelector('.player-win');

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

const rowSum = new Array(3).fill(0);
const colSum = new Array(3).fill(0);
let diag = 0;
let reverseDiag = 0;
let isWinner = false;
let playing = 0; // 1 or 0

const winner = function () {
  playerWin.textContent = `${playing === 'x' ? '1' : '2'}`;
};

//
const tictacMoves = function (row, col, player) {
  console.log(row, col, player);

  let currPlayer = player === 1 ? +1 : -1;
  rowSum[row] += currPlayer;
  colSum[col] += currPlayer;
  if (row === col) diag += currPlayer;
  if (row === 2 - col) reverseDiag += currPlayer;

  if (
    Math.abs(rowSum[row]) === 3 ||
    Math.abs(colSum[col]) === 3 ||
    diag === 3 ||
    reverseDiag === 3
  ) {
    console.log(`winner ${player}`);
  }
};

const switchPlayer = function (row) {
  playing = playing ? 0 : 1;
  row.classList.add(`${playing ? 'x' : 'o'}`);
  let [i, j] = positons[row.id];
  tictacMoves(i, j, playing);
};

function startGame() {
  tacContainer.addEventListener('click', function (e) {
    if (!isWinner) {
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
