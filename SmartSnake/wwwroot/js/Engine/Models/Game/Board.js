class Board
{
    constructor(gameMode, numberOfSnakes, snakeLength,snakeSpeed, headTurningSpeed, numberOfApples, width, height)
    {
        this.gameMode = gameMode;
        this.numberOfSnakes = numberOfSnakes;
        this.snakeLength = snakeLength;
        this.snakeSpeed = snakeSpeed;
        this.headTurningSpeed = headTurningSpeed;
        this.numberOfApples = numberOfApples;
        this.width = width;
        this.height = height;
        this.snakes = new Array(this.numberOfSnakes);
    }

    Initialization()
    {
        this.FoodInitialization();
        this.SnakesInitialization();
        this.ControlInitialization(this.snakes, this.gameMode);
    }
    
    FoodInitialization()
    {
        let apple = new Apple(this.numberOfApples, this.height, this.width);
        apple.Initialization();
    }
    
    SnakesInitialization()
    {
        this.snakes = new Array(this.numberOfSnakes);
        
        for (let i = 0; i < this.numberOfSnakes; i++)
        {
            let x = this.GetRandomInt(this.width);
            let y = this.GetRandomInt(this.height);
            let direction = this.GetRandomDirection();

            let head = new Head(direction, this.snakeSpeed, this.headTurningSpeed, { X: x, Y: y });

            let coordinatesBody = new Array(this.snakeLength);
            for(let i = 0; i < coordinatesBody.length; i++)
            {
                coordinatesBody[i] = {X: x, Y: y};
            }

            let body = new Body(head, coordinatesBody);

            this.snakes[i] = new Snake(head, body, i);

            this.snakes[i].Draw(i);
        }
    }

    ControlInitialization(snakes, gameMode)
    {
        let interval = new Interval(snakes, gameMode);
        interval.Move();

        let snakeController = new SnakeController(snakes[0]);
        snakeController.Movement();
    }

    IsEaten(elHead, index)
    {
        for(let i = 0; i < this.numberOfApples; i++)
        {
            let elApple = document.getElementById(`apple ${i}`);
            
            if(this.IsInTheAppleArea(elHead, elApple))
            {
                this.RedrawingTheApple(elApple);
                this.IncreaseTheSizeOfTheSnake(index);
            }
        }
    }
    
    IsInTheAppleArea(elHead, elApple)
    {
        let topApple = elApple.getBoundingClientRect().top;
        let bottomApple = elApple.getBoundingClientRect().bottom;
        let leftApple = elApple.getBoundingClientRect().left;
        let rightApple = elApple.getBoundingClientRect().right;
        
        let topHead = elHead.getBoundingClientRect().top;
        let bottomHead = elHead.getBoundingClientRect().bottom;
        let leftHead = elHead.getBoundingClientRect().left;
        let rightHead = elHead.getBoundingClientRect().right;
        
        return (rightApple >= leftHead && leftApple <= leftHead && bottomApple >= topHead && topApple <= topHead)
            || (rightApple >= rightHead - 5 && leftApple <= rightHead - 5 && bottomApple >= topHead && topApple <= topHead)
            || (rightApple >= leftHead && leftApple <= leftHead && bottomApple >= bottomHead - 5 && topApple <= bottomHead - 5)
            || (rightApple >= rightHead - 5 && leftApple <= rightHead && bottomApple >= bottomHead - 5 && topApple <= bottomHead - 5);
    }

    RedrawingTheApple(el)
    {
        let x = this.GetRandomInt(this.width);
        let y = this.GetRandomInt(this.height);

        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
    }

    IncreaseTheSizeOfTheSnake(index)
    {
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

    Crashed(head, index)
    {
        if(head.getBoundingClientRect().right >= width + 80
        || head.getBoundingClientRect().left <= 0 
        || head.getBoundingClientRect().top <= 0
        || head.getBoundingClientRect().bottom >= height + 60)
            this.RemoveSnake(head, index);
    }

    RemoveSnake(head, index)
    {
        head.parentNode.removeChild(head);
        
        let i = 0;
        let el = document.getElementById(`${index} body ${i}`);
        
        this.RemoveItem(index);
        
        while(el !== null)
        {
            el.parentElement.removeChild(el);
            i++;
            el = document.getElementById(`${index} body ${i}`);
        }
    }

    RemoveItem(index)
    {
        this.snakes.splice(this.FindIndex(index), 1);
    }
    
    FindIndex(index)
    {
        let result = 0;
        
        for(let i = 0; i < this.snakes.length; i++)
        {
            if(this.snakes[i].index === index)
                return i;
        }
        
        return  result;
    }

    GetRandomInt(max)
    {
        return Math.floor(Math.random() * Math.floor(max));
    }
    
    GetRandomDirection()
    {
        return Math.random() * 2 * Math.PI;
    }
}