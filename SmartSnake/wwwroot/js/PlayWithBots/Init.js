fps = 1000/60;
let gameZone = document.querySelector('.game-zone')

let gameMode = "single";
let numberOfSnakes = 8;
let snakeLength = 30;
let snakeSpeed = 3;
let headTurningSpeed = Math.PI / 50;
let numberOfApples = 40;
let width = 4000;
let height = 3000;

let board = new Board(
    numberOfSnakes,
    snakeLength,
    snakeSpeed,
    headTurningSpeed,
    numberOfApples,
    width,
    height
);

let isConnected = false;

board.Initialization();