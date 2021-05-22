class Board
{
    constructor(numberOfSnakes, snakeLength,snakeSpeed, headTurningSpeed, numberOfApples, width, height)
    {
        this.numberOfSnakes = numberOfSnakes;
        this.snakeLength = snakeLength;
        this.snakeSpeed = snakeSpeed;
        this.headTurningSpeed = headTurningSpeed;
        this.numberOfApples = numberOfApples;
        this.width = width;
        this.height = height;
        this.snakes = new Array(this.numberOfSnakes);
        this.pineapples = new Array(0);
        this.Player = null;
        this.context = null;
        this.users = new Array(0);
        this.apples = new Array(this.numberOfApples);
    }

    Initialization()
    {
        if(gameMode === "online")
        {
            let hub = new Hub(this);
            hub.HubInitialization();
        }
        else 
        {
            this.FoodInitialization();
            this.SnakesInitialization();
            this.ControlInitialization(this.snakes);
            this.PlayerInitialization(this.snakes[0]);
        }
    }
    
    FoodInitialization()
    {
        let apple = new Apple(-1,23, 20, null);
        apple.Initialization(this.apples, this.width, this.height);
    }
    
    SnakesInitialization()
    {
        this.snakes = new Array(this.numberOfSnakes);
        
        for (let i = 0; i < this.numberOfSnakes; i++)
        {
            let x = this.GetRandomArbitrary(160, width - 200);
            let y = this.GetRandomArbitrary(150, height - 200);
            let direction = this.GetRandomDirection();

            let head = new Head(direction, this.snakeSpeed, this.headTurningSpeed, { x: x, y: y });

            let coordinatesBody = new Array(this.snakeLength);
            for(let i = 0; i < coordinatesBody.length; i++)
            {
                coordinatesBody[i] = {x: x, y: y};
            }

            let body = new Body(head, coordinatesBody, 25, 25);

            this.snakes[i] = new Snake(head, body, i);

            this.snakes[i].Draw(i);
        }
    }

    ControlInitialization(snakes)
    {
        let interval = new Interval(snakes);
        interval.Move();

        let snakeController = new SnakeController(snakes[0]);
        snakeController.Movement();
    }
    
    PlayerInitialization(snake)
    {
        this.Player = new Player(snake);
        gameZone.innerHTML += `<div class="score" id="score" style="
                    left: ${this.snakes[0].head.coordinates.x - document.documentElement.clientWidth / 2}px;
                    top: ${this.snakes[0].head.coordinates.y - document.documentElement.clientHeight / 2}px; color: #00f2ff">Your score: 0</div>`;
    }
    
    IsEaten(head, index)
    {
        let context;
        if(gameMode === "online")
            context = this.context;
        else 
            context = this;
        
        for(let i = 0; i < context.apples.length; i++)
        {
            let top1 = context.apples[i].coordinates.y;
            let bottom1 = context.apples[i].coordinates.y + context.apples[i].height;
            let left1 = context.apples[i].coordinates.x;
            let right1 = context.apples[i].coordinates.x + context.apples[i].width;

            let top2 = head.coordinates.y;
            let bottom2 = head.coordinates.y + head.height;
            let left2 = head.coordinates.x;
            let right2 = head.coordinates.x + head.width;
            
            if(context.IsInTheArea(top1, bottom1, left1, right1, top2, bottom2, left2, right2))
            {
                context.RedrawingTheApple(context.apples[i], i);
                context.IncreaseTheSizeOfTheSnake(index, 1);
            }
        }

        for(let i = 0; i < context.pineapples.length; i++)
        {
            if(context.pineapples[i] === null)
                continue;
            let top1 = context.pineapples[i].coordinates.y;
            let bottom1 = context.pineapples[i].coordinates.y + context.pineapples[i].height;
            let left1 = context.pineapples[i].coordinates.x;
            let right1 = context.pineapples[i].coordinates.x + context.pineapples[i].width;

            let top2 = head.coordinates.y;
            let bottom2 = head.coordinates.y + head.height;
            let left2 = head.coordinates.x;
            let right2 = head.coordinates.x + head.width;

            if(this.IsInTheArea(top1, bottom1, left1, right1, top2, bottom2, left2, right2))
            {
                let el = document.getElementById(`pineapple ${i}`);
                el.parentElement.removeChild(el);
                
                if(gameMode === "online")
                {
                    let index = context.pineapples[i].index;
                    hubConnection.invoke('SendPineapple', index);
                }
                
                context.pineapples[i] = null;

                context.IncreaseTheSizeOfTheSnake(index, 5);
            }
        }
        
        if(index === 0)
        {
            let score = document.getElementById("score");
            let x = head.coordinates.x - document.documentElement.clientWidth / 2;
            let y = head.coordinates.y - document.documentElement.clientHeight / 2;
            if(x < 0)
                x = 0;
            else if (x > 2350)
                x = 2355;
            
            if(y < 0)
                y = 0;
            
            else if (y > 2110)
                y = 2120;
            score.style.left = x + 'px';
            score.style.top = y + 'px';
            score.innerText = "Your score: " + context.Player.score;
        }
    }
    
    IsInTheArea(top1, bottom1, left1, right1, top2, bottom2, left2, right2)
    {
        return (right1 >= left2 && left1 <= left2 && bottom1 >= top2 && top1 <= top2)
            || (right1 >= right2 - 5 && left1 <= right2 - 5 && bottom1 >= top2 && top1 <= top2)
            || (right1 >= left2 && left1 <= left2 && bottom1 >= bottom2 - 5 && top1 <= bottom2 - 5)
            || (right1 >= right2 - 5 && left1 <= right2 && bottom1 >= bottom2 - 5 && top1 <= bottom2 - 5);
    }

    RedrawingTheApple(apple, index)
    {
        let x = this.GetRandomArbitrary(160, width - 200);
        let y = this.GetRandomArbitrary(150, height - 200);

        apple.coordinates.x = x;
        apple.coordinates.y = y;
        
        if(gameMode === "online")
            hubConnection.invoke('SendApple', index, x, y);

        let el = document.getElementById(`apple ${index}`);

        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
    }

    IncreaseTheSizeOfTheSnake(index, score)
    {
        if(index === 0)
            this.Player.score += score;
        
        let massIndex = this.FindIndex(index);
        for(let i = this.snakes[massIndex].body.coordinates.length-1; i >= 0; i--)
        {
            let el = document.getElementById(`${index} body ${i}`);
            el.id = `${index} body ${i+1}`;
            
            this.snakes[massIndex].body.coordinates[i + 1] = {x: this.snakes[massIndex].body.coordinates[i].x,
                                                            y: this.snakes[massIndex].body.coordinates[i].y};
        }
        
        let el = document.getElementById(`${index} body ${1}`);
        
        if(index === 0)
            gameZone.innerHTML += `<div class="body" id="${index} body ${0}"
                                    style="left: ${el.style.left}; top: ${el.style.top};"></div>`;
        else
            gameZone.innerHTML += `<div class="enemy_body" id="${index} body ${0}"
                                    style="left: ${el.style.left}; top: ${el.style.top};"></div>`;
    }

    Crashed(head, body, index)
    {
        let context;
        
        if(gameMode === "online")
        {
            context = this.context;
        }
        else
            context = this;
        
        let topHead = head.coordinates.y;
        let bottomHead = head.coordinates.y + head.height;
        let leftHead = head.coordinates.x;
        let rightHead = head.coordinates.x + head.width;
        
        if(rightHead >= 3810
        || leftHead <= 145 
        || topHead <= 110
        || bottomHead >= 2915) 
        {
            context.RemoveSnake(head, body, index);
            return;
        }
        for(let i = 0; i < context.snakes.length; i++)
        {
            if(i !== index && context.snakes[i] !== undefined)
            {
                let topEnemyHead = context.snakes[i].head.coordinates.y;
                let bottomEnemyHead = context.snakes[i].head.coordinates.y + head.height;
                let leftEnemyHead = context.snakes[i].head.coordinates.x;
                let rightEnemyHead = context.snakes[i].head.coordinates.x + head.width;
                
                if(context.IsInTheArea(topHead, bottomHead, leftHead, rightHead,
                    topEnemyHead, bottomEnemyHead, leftEnemyHead, rightEnemyHead))
                {
                    context.RemoveSnake(head, body, index);
                    return;
                }
               
                for(let j = this.snakes[i].body.coordinates.length - 10; j >= 0; j -= 4)
                {
                    let topEnemyBody = context.snakes[i].body.coordinates[j].y;
                    let bottomEnemyBody = context.snakes[i].body.coordinates[j].y + context.snakes[i].body.height;
                    let leftEnemyBody = context.snakes[i].body.coordinates[j].x;
                    let rightEnemyBody = context.snakes[i].body.coordinates[j].x + context.snakes[i].body.width;

                    if(context.IsInTheArea(topHead, bottomHead, leftHead, rightHead,
                        topEnemyBody, bottomEnemyBody, leftEnemyBody, rightEnemyBody))
                    {
                        context.RemoveSnake(head, body, index);
                        return;
                    }
                }
            }
        }
    }

    RemoveSnake(head, body, index)
    {
        let pineapple = new Pineapple(this.pineapples.length,40, 26, {x: head.coordinates.x, y: head.coordinates.y});
        this.pineapples.push(pineapple);
        gameZone.innerHTML += `<div class="pineapple" id="pineapple ${this.pineapples.length - 1}" style="left: ${pineapple.coordinates.x}px; top: ${pineapple.coordinates.y}px;"></div>`

        
        if(index === 0)
        {
            if(head.el.parentNode !== null)
                head.el.parentNode.removeChild(head.el);

            let i = 0;
            let el = document.getElementById(`${index} body ${i}`);

            while(el !== null)
            {
                el.parentElement.removeChild(el);
                i++;
                el = document.getElementById(`${index} body ${i}`);
            }
            this.GameOver();
            this.RemoveItem(index);
        }
        else
        {
            let x = this.GetRandomArbitrary(160, width - 200);
            let y = this.GetRandomArbitrary(150, height - 200);

            head.coordinates.x = x;
            head.coordinates.y = y;

            head.el.style.left = x + 'px';
            head.el.style.top = y + "px";
            
            for(let i = 0; i < body.coordinates.length; i++)
            {
                body.coordinates[i].x = x;
                body.coordinates[i].y = y;
                
                let el = document.getElementById(`${index} body ${i}`);
                el.style.left = `${body.coordinates[i].x}px`;
                el.style.top = `${body.coordinates[i].y}px`;
            }
        }
    }

    RemoveItem(index)
    {
        //this.snakes.splice(this.FindIndex(index), 1);
        this.snakes[index] = undefined;
    }
    
    FindIndex(index)
    {
        let result = 0;
        
        for(let i = 0; i < this.snakes.length; i++)
        {
            if(this.snakes[i] !== undefined && this.snakes[i].index === index)
                return i;
        }
        
        return  result;
    }

    GetRandomArbitrary(min, max) 
    {
        return Math.random() * (max - min) + min;
    }
    
    GetRandomDirection()
    {
        return Math.random() * 2 * Math.PI;
    }
    
    GameOver()
    {
        let link = document.getElementById("restart_link");
        if(gameMode === "single")
            link.href = "/Game/Single/Restart?score=" + `${this.Player.score}`;
        else
            link.href = "/Game/Online/Restart?score=" + `${this.Player.score}`;
        link.click();
    }
}