class  Interval
{
    constructor(snakes, context = null)
    {
        this.snakes = snakes;
        this.context = context;
    }

    Move()
    {
        switch (gameMode) 
        {
            case "single":
                this.singleMode = setInterval(() => {
                    for(let i = 1; i < this.snakes.length; i++)
                    {
                        this.BotMovement(this.snakes[i]);
                    }
                }, fps * 100);
                
                this.snakeMove = setInterval(() => {
                    for(let i = 0; i < this.snakes.length; i++)
                    {
                        if(this.snakes[i] !== undefined)
                            this.snakes[i].body.Move(this.snakes[i].direction, this.snakes[i].index);
                    }
                }, fps);
                break;
            case "online":
                board.context = this.context;
                this.snakeMove = setInterval(() => {
                    this.snakes[0].body.Move(this.snakes[0].direction, this.snakes[0].index);
                }, fps);
                break;
        }
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
