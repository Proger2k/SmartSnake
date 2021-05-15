fps = 1000/60;
let gameZone = document.querySelector('.game-zone')

let gameMode = "single";
let numberOfSnakes = 3;
let snakeLength = 100;
let snakeSpeed = 6;
let headTurningSpeed = Math.PI / 50;
let numberOfApples = 40;
let width = 4000;
let height = 3000;

let board = new Board(
    gameMode,
    numberOfSnakes,
    snakeLength,
    snakeSpeed,
    headTurningSpeed,
    numberOfApples,
    width,
    height
);

board.Initialization();