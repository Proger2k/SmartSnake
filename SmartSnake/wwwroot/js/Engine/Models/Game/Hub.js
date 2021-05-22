class Hub
{
    constructor(board)
    {
        this.board = board;
    }

    HubInitialization()
    {
        this.Notify(this);
        this.ReceiveUser();
        this.ReceiveSnake(this);
        this.ReceiveApples();
        this.ReceiveApple();
        this.ReceivePineapple();
        this.ReceivePineapples();
        this.SendApples();
        this.SendPineapples();
        this.BeginningOfTheGame();
        this.ConnectToTheGame();

        hubConnection.start();
    }

    Notify(context)
    {
        hubConnection.on('Notify', function (connectionId, status) {
            
            if(status !== "-1" && status !== "0")
            {
                hubConnection.invoke('AddUser', { 'connectionId': connectionId, 'isGameBegun': isStarted});
                hubConnection.invoke('SendUser', isStarted);
            }
            
            if (status === "1" && isStarted)
            {
                let head = {direction: context.board.Player.snake.head.direction,
                    coordinates: {x: context.board.Player.snake.head.coordinates.x, y: context.board.Player.snake.head.coordinates.y},
                    height: context.board.Player.snake.head.height,
                    width: context.board.Player.snake.head.width};

                let body = {coordinates: context.board.Player.snake.body.coordinates,
                    height: context.board.Player.snake.body.height,
                    width: context.board.Player.snake.body.width};

                let snake = {head: head, body: body};

                hubConnection.invoke('SendSnake', { 'connectionId': "", 'snake': snake});
            }
            else if(status === "0")
                isConnected = true;
            else if (status === "-1" && isStarted)
            {
                let head = document.getElementById(`${connectionId} head`);
                
                let x = Number(head.style.left.substr(0,  head.style.left.length - 2));
                let y = Number(head.style.top.substr(0,  head.style.top.length - 2));

                head.parentNode.removeChild(head);

                let pineapple = new Pineapple(context.board.pineapples.length,40, 26, {x: x, y: y});
                context.board.pineapples.push(pineapple);
                gameZone.innerHTML += `<div class="pineapple" id="pineapple ${context.board.pineapples.length - 1}" style="left: ${x}px; top: ${y}px;"></div>`
                

                let user = context.FindUser(context, connectionId);
                let index = context.FindIndex(context, user);
                
                for(let i = 0; i < user.snake.body.coordinates.length; i++)
                {
                    let el = document.getElementById(`${connectionId} body ${i}`);
                    el.parentNode.removeChild(el);
                }

                context.board.users.splice(index, 1);
                context.RemoveSnake(connectionId, context);
                
                hubConnection.invoke('RemoveUser', connectionId);
            }
        });
    }

    ReceiveUser()
    {
        hubConnection.on('ReceiveUser', function (connectionId, isStarted) {
            hubConnection.invoke('AddUser', { 'connectionId': connectionId, 'isGameBegun': isStarted});
        })
    }

    ReceiveSnake(context)
    {
        hubConnection.on('ReceiveSnake', function (enemy)
        {
            let isFound = false;
            if(context.board.users.length !== 0)
            {
                isFound = context.board.users.find((element) => {
                    if (element.connectionId === enemy.connectionId)
                        return true;
                });
            }

            if(!isFound)
            {
                let snake = new Snake(enemy.snake.head, enemy.snake.body, enemy.connectionId);
                let user = new User(snake, enemy.connectionId);
                context.board.users.push(user);
                context.board.snakes.push(snake);

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
                    let user = context.FindUser(context, enemy.connectionId);
                    
                    user.snake.head = enemy.snake.head;
                    user.snake.body = enemy.snake.body;
                    
                    head.style.left = `${enemy.snake.head.coordinates.x}px`;
                    head.style.top = `${enemy.snake.head.coordinates.y}px`;
                    head.style.transform =  `rotate(${enemy.snake.head.direction*180/(Math.PI)}deg)`;
                    
                    for(let i = 0; i < enemy.snake.body.coordinates.length; i++)
                    {
                        let el = document.getElementById(`${enemy.connectionId} body ${i}`);
                        if(el === null)
                        {
                            gameZone.innerHTML += `<div class="enemy_body" id="${enemy.connectionId} body ${i}"
                                        style="left: ${enemy.snake.body.coordinates[i].x}px;
                                               top: ${enemy.snake.body.coordinates[i].y}px;"></div>`

                            head = document.getElementById(`${enemy.connectionId} head`);
                            head.parentNode.removeChild(head);
                            gameZone.innerHTML += `<div class="enemy_head" id="${enemy.connectionId} head"
                                    style="left: ${enemy.snake.head.coordinates.x}px;     
                                           top: ${enemy.snake.head.coordinates.y}px;
                                           transform: rotate(${enemy.snake.head.direction*180/(Math.PI/2)}deg);"></div>`
                        }
                        else
                        {
                            el.style.left = `${enemy.snake.body.coordinates[i].x}px`;
                            el.style.top = `${enemy.snake.body.coordinates[i].y}px`;   
                        }
                    }
                }
            }
        });
    }

    ReceiveApples()
    {
        let context = this;
        
        hubConnection.on('ReceiveApples', function (apples)
        {
            if(context.board.apples.length === 0)
            {
                context.board.apples = apples;
                for(let i = 0; i < apples.length; i++)
                {
                    gameZone.innerHTML += `<div class="apple" id="apple ${apples[i].index}"
                                            style="left: ${apples[i].coordinates.x}px;
                                             top: ${apples[i].coordinates.y}px;"></div>`
                }
            }
        });
    }

    ReceiveApple()
    {
        let context = this;
        hubConnection.on('ReceiveApple', function (index, x, y)
        {
            context.board.apples[index].coordinates.x = x;
            context.board.apples[index].coordinates.y = y;

            let el = document.getElementById(`apple ${index}`);
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
        });
    }

    ReceivePineapple()
    {
        let context = this;
        hubConnection.on('ReceivePineapple', function (index)
        {
            let el = document.getElementById(`pineapple ${index}`);
            context.board.pineapples.splice(index, 1); 
            el.parentNode.removeChild(el);
        });
    }

    ReceivePineapples()
    {
        let context = this;

        hubConnection.on('ReceivePineapples', function (pineapples)
        {
            if(context.board.pineapples.length === 0)
            {
                context.board.pineapples = pineapples;
                for(let i = 0; i < pineapples.length; i++)
                {
                    gameZone.innerHTML += `<div class="pineapple" id="pineapple ${pineapples[i].index}"
                                            style="left: ${pineapples[i].coordinates.x}px;
                                             top: ${pineapples[i].coordinates.y}px;"></div>`
                }   
            }
        });
    }

    SendApples()
    {
        let context = this;

        hubConnection.on('SendApples', function ()
        {
            hubConnection.invoke('SendApples', context.board.apples);
        });
    }

    SendPineapples()
    {
        let context = this;

        hubConnection.on('SendPineapples', function ()
        {
            hubConnection.invoke('SendPineapples', context.board.pineapples);
        });
    }

    BeginningOfTheGame()
    {
        let context = this;

        hubConnection.on('BeginningOfTheGame', function ()
        {
            gameZone.style.display = "block";
            let loading = document.getElementById("loading");
            loading.style.display = "none";
            
            isStarted = true;
            context.GeneratePlayer(context);
            context.GenerateApples(context);

            context.board.snakes[0] = context.board.Player.snake;
            context.ControlInitialization(context.board.snakes, context.board);

            hubConnection.invoke('SendSnake', { 'connectionId': "", 'snake': context.board.Player.snake});
        });
    }

    ConnectToTheGame()
    {
        let context = this;
        
        hubConnection.on('ConnectToTheGame', function ()
        {
            gameZone.style.display = "block";
            let loading = document.getElementById("loading");
            loading.style.display = "none";
            
            isStarted = true;
            context.GeneratePlayer(context);
            hubConnection.invoke('ReceiveApples');
            hubConnection.invoke('ReceivePineapples');
            
            context.board.snakes[0] = context.board.Player.snake;
            context.ControlInitialization(context.board.snakes, context.board);

            hubConnection.invoke('SendSnake', { 'connectionId': "", 'snake': context.board.Player.snake});
        });
    }
    
    GenerateApples(context)
    {
        let apple1 = new Apple(0, 25, 25, {x: 250, y: 400});
        let apple2 = new Apple(1, 25, 25, {x: 1500, y: 250});
        let apple3 = new Apple(2, 25, 25, {x: 1100, y: 750});
        let apple4 = new Apple(3, 25, 25, {x: 950, y: 799});
        let apple5 = new Apple(4, 25, 25, {x: 300, y: 430});
        let apple6 = new Apple(5, 25, 25, {x: 888, y: 333});
        let apple7 = new Apple(6, 25, 25, {x: 777, y: 555});
        let apple8 = new Apple(7, 25, 25, {x: 333, y: 333});
        let apple9 = new Apple(8, 25, 25, {x: 2222, y: 2400});
        let apple10 = new Apple(9, 25, 25, {x: 789, y: 456});
        let apple11 = new Apple(10, 25, 25, {x: 654, y: 321});
        let apple12 = new Apple(11, 25, 25, {x: 480, y: 781});
        let apple13 = new Apple(12, 25, 25, {x: 1250, y: 400});
        let apple14 = new Apple(13, 25, 25, {x: 1999, y: 700});
        let apple15 = new Apple(14, 25, 25, {x: 789, y: 1500});
        let apple16 = new Apple(15, 25, 25, {x: 2459, y: 1100});
        let apple17 = new Apple(16, 25, 25, {x: 789, y: 565});
        let apple18 = new Apple(17, 25, 25, {x: 3333, y: 2222});
        let apple19 = new Apple(18, 25, 25, {x: 3000, y: 2000});
        let apple20 = new Apple(19, 25, 25, {x: 3500, y: 2500});
        context.board.apples.push(apple1, apple2, apple3, apple4, apple5,
            apple6, apple7, apple8, apple9, apple10,
            apple11, apple12, apple13, apple14, apple15,
            apple16, apple17, apple18, apple19, apple20);

        for(let i = 0; i < context.board.apples.length; i++)
        {
            gameZone.innerHTML += `<div class="apple" id="apple ${context.board.apples[i].index}"
                                        style="left: ${context.board.apples[i].coordinates.x}px; 
                                                top: ${context.board.apples[i].coordinates.y}px;"></div>`
        }
        isStarted = true;
    }
    
    GeneratePlayer(context)
    {
        let x = context.board.GetRandomArbitrary(160, width - 200);
        let y = context.board.GetRandomArbitrary(150, height - 200);
        let direction = context.board.GetRandomDirection();

        let head = new Head(direction, context.board.snakeSpeed, context.board.headTurningSpeed, { x: x, y: y });

        let coordinatesBody = new Array(context.board.snakeLength);
        for(let i = 0; i < coordinatesBody.length; i++)
        {
            coordinatesBody[i] = {x: x, y: y};
        }

        let body = new Body(head, coordinatesBody, 25, 25);
        let snake = new Snake(head, body, 0);

        context.board.Player = new Player(snake);

        for(let i = 0; i < context.board.Player.snake.body.coordinates.length; i++)
        {
            gameZone.innerHTML += `<div class="body" id="${0} body ${i}"
                                        style="left: ${context.board.Player.snake.body.coordinates[i].x}px;
                                               top: ${context.board.Player.snake.body.coordinates[i].y}px;"></div>`
        }

        gameZone.innerHTML += `<div class="head" id="${0} head"
                                    style="left: ${context.board.Player.snake.head.coordinates.x}px;     
                                           top: ${context.board.Player.snake.head.coordinates.y}px;
                                           transform: rotate(${context.board.Player.snake.head.direction*180/(Math.PI/2)}deg);"></div>`

        gameZone.innerHTML += `<div class="score" id="score" style="
                    left: ${context.board.Player.snake.head.coordinates.x - document.documentElement.clientWidth / 2}px;
                    top: ${context.board.Player.snake.head.coordinates.y - document.documentElement.clientHeight / 2}px; color: #00f2ff;">Your score: 0</div>`;
    }

    ControlInitialization(snakes, context)
    {
        let interval = new Interval(snakes, context);
        interval.Move();

        let snakeController = new SnakeController(snakes[0]);
        snakeController.Movement();
    }
    
    RemoveSnake(index, context)
    {
        let number = 0;
        for(let i = 0; i < context.board.snakes.length; i++)
        {
            if(context.board.snakes[i].index === index)
            {
                number = i;
                break;
            }
        }
        
        context.board.snakes.splice(number, 1);
    }
    
    FindUser(context, connectionId)
    {
        for(let i = 0; i <context.board.users.length; i++)
        {
            if(context.board.users[i].connectionId === connectionId)
            {
                return context.board.users[i];
            }
        }
    }
    
    FindIndex(context, user)
    {
        for(let i = 0; i <context.board.users.length; i++)
        {
            if(context.board.users[i] === user)
            {
                return i;
            }
        }
    }
}