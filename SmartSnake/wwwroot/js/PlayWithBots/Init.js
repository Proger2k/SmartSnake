fps = 1000/60;
let gameZone = document.querySelector('.game-zone')

let gameMode = "single";
let numberOfSnakes = 8;
let snakeLength = 10;
let snakeSpeed = 3;
let headTurningSpeed = Math.PI / 50;
let numberOfApples = 10;
let width = 1600;
let height = 850;

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