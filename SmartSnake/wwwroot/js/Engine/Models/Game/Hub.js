class Hub
{
    constructor(board)
    {
        this.board = board;
    }

    HubInitialization()
    {
        this.Notify(this.board);
        this.Receive(this.board);

        hubConnection.start();
    }

    Notify(board)
    {
        hubConnection.on('Notify', function (connectionId, status) {

            if (status === "1")
            {
                let head = {direction: board.snakes[0].head.direction,
                    coordinates: {X: board.snakes[0].head.coordinates.X, Y: board.snakes[0].head.coordinates.Y},
                    height: board.snakes[0].head.height,
                    width: board.snakes[0].head.width};

                let body = {coordinates: board.snakes[0].body.coordinates,
                    height: board.snakes[0].body.height,
                    width: board.snakes[0].body.width};

                let snake = {head: head, body: body};

                hubConnection.invoke('Send', { 'connectionId': "", 'snake': snake});
            }
            else if(status === "0")
            {
                isConnected = true;
            }
            else
            {
            }
        });
    }

    Receive(board)
    {
        hubConnection.on('Receive', function (enemy)
        {
            console.log(board.users);
            let isFound = false;
            if(board.users.length !== 0)
            {
                isFound = board.users.find((element) => {
                    if (element.connectionId === enemy.connectionId)
                        return true;
                });
            }

            if(!isFound)
            {
                let snake = new Snake(enemy.snake.head, enemy.snake.body, enemy.connectionId);
                let user = new User(snake, enemy.connectionId);
                board.users.push(user);

                for(let i = 0; i < snake.body.coordinates.length; i++)
                {
                    gameZone.innerHTML += `<div class="enemy_body" id="${snake.index} body ${i}"
                                        style="left: ${snake.body.coordinates[i].x}px;
                                               top: ${snake.body.coordinates[i].y}px;"></div>`
                }

                gameZone.innerHTML += `<div class="enemy_head" id="${snake.index} head"
                                    style="left: ${snake.head.coordinates.x}px;     
                                           top: ${snake.head.coordinates.y}px;
                                           transform: rotate(${snake.head.direction*180/(Math.PI/2)}deg);"></div>`
            }
            else
            {
                let head = document.getElementById(`${enemy.connectionId} head`);
                if(head === undefined) {}
                else
                {
                    head.style.left = `${enemy.snake.head.coordinates.x}px`;
                    head.style.top = `${enemy.snake.head.coordinates.y}px`;
                    head.style.transform =  `rotate(${enemy.snake.head.direction})`;

                    for(let i = 0; i < enemy.snake.body.coordinates.length; i++)
                    {
                        let el = document.getElementById(`${enemy.connectionId} body ${i}`);
                        el.style.left = `${enemy.snake.body.coordinates[i].x}px`;
                        el.style.top = `${enemy.snake.body.coordinates[i].y}px`;
                    }
                }
            }
        });
    }
}