fps = 1000/60;
let gameZone = document.querySelector('.game-zone')

let numberOfSnakes = 2;
let snakeLength = 30;
let snakeSpeed = 3;
let headTurningSpeed = Math.PI / 50;
let numberOfApples = 5;
let width = 1600;
let height = 850;

let board = new Board(
    numberOfSnakes,
    snakeLength,
    snakeSpeed,
    headTurningSpeed,
    numberOfApples,
    width,
    height
);

board.Initialization();