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
    }

    Initialization()
    {
        this.FoodInitialization();
        this.SnakesInitialization();
        this.ControlInitialization(this.snakes);
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

            let body = new Body(head, this.snakeLength, coordinatesBody);

            this.snakes[i] = new Snake(head, body);

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

    IsEaten(elHead, index)
    {
        for(let i = 0; i < this.numberOfApples; i++)
        {
            let elApple = document.getElementById(`apple ${i}`);
            
            if(this.IsInTheAppleArea(elHead, elApple))
            {
                this.RedrawingTheApple(elApple);
                this.IncreaseTheSizeOfTheSnake(index, elHead);
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

    IncreaseTheSizeOfTheSnake(index, head)
    {
        this.snakes[index].body.length++;
        
        for(let i = this.snakes[index].body.length-2; i >= 0; i--)
        {
            let el = document.getElementById(`${index} body ${i}`);
            el.id = `${index} body ${i+1}`;
            
            this.snakes[index].body.coordinates[i + 1] =  this.snakes[index].body.coordinates[i]
        }
        
        let el = document.getElementById(`${index} body ${1}`);
        this.snakes[index].body.coordinates[this.snakes[index].body.length - 1] =
            {X: Number(el.style.left.slice(0, -2)), Y: Number(el.style.top.slice(0, -2))};
        
        gameZone.innerHTML += `<div class="body" id="${index} body ${0}"
                                    style="left: ${el.style.left}; top: ${el.style.top};"></div>`
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
        
        delete this.snakes[index];
        this.snakes.length--;
        
        while(el !== null)
        {
            el.parentElement.removeChild(el);
            i++;
            el = document.getElementById(`${index} body ${i}`);
        }
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