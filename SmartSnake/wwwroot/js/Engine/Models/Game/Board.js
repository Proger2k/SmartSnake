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
        this.pineaples = new Array(0);
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

            let head = new Head(direction, this.snakeSpeed, this.headTurningSpeed, { X: x, Y: y });

            let coordinatesBody = new Array(this.snakeLength);
            for(let i = 0; i < coordinatesBody.length; i++)
            {
                coordinatesBody[i] = {X: x, Y: y};
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
                    left: ${this.snakes[0].head.coordinates.X - document.documentElement.clientWidth / 2}px;
                    top: ${this.snakes[0].head.coordinates.Y - document.documentElement.clientHeight / 2}px;">Your score: 0</div>`;
    }
    
    IsEaten(head, index)
    {
        let context;
        if(gameMode === "online")
            context = this.context;
        else 
            context = this;
        
        for(let i = 0; i < context.numberOfApples; i++)
        {
            let top1 = context.apples[i].coordinates.Y;
            let bottom1 = context.apples[i].coordinates.Y + context.apples[i].height;
            let left1 = context.apples[i].coordinates.X;
            let right1 = context.apples[i].coordinates.X + context.apples[i].width;

            let top2 = head.coordinates.Y;
            let bottom2 = head.coordinates.Y + head.height;
            let left2 = head.coordinates.X;
            let right2 = head.coordinates.X + head.width;
            
            if(context.IsInTheArea(top1, bottom1, left1, right1, top2, bottom2, left2, right2))
            {
                context.RedrawingTheApple(context.apples[i], i);
                context.IncreaseTheSizeOfTheSnake(index, 1);
            }
        }

        for(let i = 0; i < context.pineaples.length; i++)
        {
            if(this.pineaples[i] === null)
                continue;
            let top1 = context.pineaples[i].coordinates.Y;
            let bottom1 = context.pineaples[i].coordinates.Y + context.pineaples[i].height;
            let left1 = context.pineaples[i].coordinates.X;
            let right1 = context.pineaples[i].coordinates.X + context.pineaples[i].width;

            let top2 = head.coordinates.Y;
            let bottom2 = head.coordinates.Y + head.height;
            let left2 = head.coordinates.X;
            let right2 = head.coordinates.X + head.width;

            if(this.IsInTheArea(top1, bottom1, left1, right1, top2, bottom2, left2, right2))
            {
                let el = document.getElementById(`pineapple ${i}`);
                el.parentElement.removeChild(el);
                context.pineaples[i] = null;

                context.IncreaseTheSizeOfTheSnake(index, 5);
            }
        }
        
        if(index === 0)
        {
            let score = document.getElementById("score");
            let x = head.coordinates.X - document.documentElement.clientWidth / 2;
            let y = head.coordinates.Y - document.documentElement.clientHeight / 2;
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

        apple.coordinates.X = x;
        apple.coordinates.Y = y;
        
        if(gameMode === "online")
            hubConnection.invoke('SendApple', { 'apple': apple});

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
            
            this.snakes[massIndex].body.coordinates[i + 1] = {X: this.snakes[massIndex].body.coordinates[i].X,
                                                            Y: this.snakes[massIndex].body.coordinates[i].Y};
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
        let topHead = head.coordinates.Y;
        let bottomHead = head.coordinates.Y + head.height;
        let leftHead = head.coordinates.X;
        let rightHead = head.coordinates.X + head.width;
        
        if(rightHead >= 3810
        || leftHead <= 145 
        || topHead <= 110
        || bottomHead >= 2915) 
        {
            this.RemoveSnake(head, body, index);
            return;
        }
        for(let i = 0; i < this.snakes.length; i++)
        {
            if(i !== index && this.snakes[i] !== undefined)
            {
                let topEnemyHead = this.snakes[i].head.coordinates.Y;
                let bottomEnemyHead = this.snakes[i].head.coordinates.Y + head.height;
                let leftEnemyHead = this.snakes[i].head.coordinates.X;
                let rightEnemyHead = this.snakes[i].head.coordinates.X + head.width;
                
                if(this.IsInTheArea(topHead, bottomHead, leftHead, rightHead,
                    topEnemyHead, bottomEnemyHead, leftEnemyHead, rightEnemyHead))
                {
                    this.RemoveSnake(head, body, index);
                    return;
                }
               
                for(let j = this.snakes[i].body.coordinates.length - 10; j >= 0; j -= 4)
                {
                    let topEnemyBody = this.snakes[i].body.coordinates[j].Y;
                    let bottomEnemyBody = this.snakes[i].body.coordinates[j].Y + this.snakes[i].body.height;
                    let leftEnemyBody = this.snakes[i].body.coordinates[j].X;
                    let rightEnemyBody = this.snakes[i].body.coordinates[j].X + this.snakes[i].body.width;

                    if(this.IsInTheArea(topHead, bottomHead, leftHead, rightHead,
                        topEnemyBody, bottomEnemyBody, leftEnemyBody, rightEnemyBody))
                    {
                        this.RemoveSnake(head, body, index);
                        return;
                    }
                }
            }
        }
    }

    RemoveSnake(head, body, index)
    {
        let pineapple = new Pineapple(this.pineaples.length,40, 26, {X: head.coordinates.X, Y: head.coordinates.Y});
        this.pineaples.push(pineapple);
        gameZone.innerHTML += `<div class="pineapple" id="pineapple ${this.pineaples.length - 1}" style="left: ${pineapple.coordinates.X}px; top: ${pineapple.coordinates.Y}px;"></div>`

        
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

            head.coordinates.X = x;
            head.coordinates.Y = y;

            head.el.style.left = x + 'px';
            head.el.style.top = y + "px";
            
            for(let i = 0; i < body.coordinates.length; i++)
            {
                body.coordinates[i].X = x;
                body.coordinates[i].Y = y;
                
                let el = document.getElementById(`${index} body ${i}`);
                el.style.left = `${body.coordinates[i].X}px`;
                el.style.top = `${body.coordinates[i].Y}px`;
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