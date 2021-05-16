﻿fps = 1000/60;
let gameZone = document.querySelector('.game-zone')

let gameMode = "online";
let numberOfSnakes = 1;
let snakeLength = 10;
let snakeSpeed = 3;
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