﻿class Board
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
        
    }

    Crashed(head, index)
    {
        if(head.getBoundingClientRect().right >= gameZone.getBoundingClientRect().right 
        || head.getBoundingClientRect().left <= gameZone.getBoundingClientRect().left 
        || head.getBoundingClientRect().top <= gameZone.getBoundingClientRect().top 
        || head.getBoundingClientRect().bottom >= gameZone.getBoundingClientRect().bottom)
            this.RemoveSnake(head, index);
    }

    RemoveSnake(head, index)
    {
        head.parentNode.removeChild(head);
        
        let i = 0;
        let el = document.getElementById(`${index} body ${i}`);
        
        while(el !== undefined)
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