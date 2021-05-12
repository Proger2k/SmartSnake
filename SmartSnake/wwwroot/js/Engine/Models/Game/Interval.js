class  Interval
{
    constructor(snakes, gameMode)
    {
        this.snakes = snakes;
        this.gameMode = gameMode;
    }

    Move()
    {
        switch (this.gameMode) 
        {
            case "single":
                this.singleMode = setInterval(() => {
                    for(let i = 1; i < this.snakes.length; i++)
                    {
                        this.BotMovement(this.snakes[i]);
                    }
                }, fps * 100)
                break;
            case "online":
                break;
        }
        
        this.snakeMove = setInterval(() => {
            for(let i = 0; i < this.snakes.length; i++)
            {
                if(this.snakes[i] !== undefined)
                    this.snakes[i].body.Move(this.snakes[i].direction, this.snakes[i].index);
            }
        }, fps);
    }

    BotMovement(snake)
    {
        snake.direction = this.GetRandomInt(3);
    }

    GetRandomInt(max)
    {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
