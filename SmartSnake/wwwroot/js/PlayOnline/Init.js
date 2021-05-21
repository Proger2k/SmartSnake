fps = 1000/60;
let gameZone = document.querySelector('.game-zone')
gameZone.style.display = "none";

let gameMode = "online";
let isStarted = false;
let numberOfSnakes = 1;
let snakeLength = 30;
let snakeSpeed = 5;
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

let userName = document.getElementById("userName").innerText;

const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/game")
    .build();

let isConnected = false;

board.Initialization();

