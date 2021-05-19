fps = 1000/60;
let gameZone = document.querySelector('.game-zone')

let gameMode = "online";
let isStarted = false;
let numberOfSnakes = 1;
let snakeLength = 10;
let snakeSpeed = 3;
let headTurningSpeed = Math.PI / 50;
let numberOfApples = 0;
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

const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/game")
    .build();

let isConnected = false;

board.Initialization();

