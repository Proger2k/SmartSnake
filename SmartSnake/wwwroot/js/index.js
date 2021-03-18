fps = 1000/60;
let gameZone = document.querySelector('.game-zone')

let head = new Head(Math.PI / 2, 3, Math.PI / 50, { X: 100, Y: 100 });

let coordinatesBody = new Array(30);
for(let i = 0; i < coordinatesBody.length; i++)
{
    coordinatesBody[i] = {X: 100, Y: 105 + i*5};
}

let body = new Body(head, 30,45, coordinatesBody);

let snake = new Snake(head, body);

snake.Draw();
snake.Intervals();
movement();