class  Interval
{
    constructor(snakes)
    {
        this.snakes = snakes;
    }

    Move()
    {
        this.snakeMove = setInterval(() => {
            for(let i = 0; i < this.snakes.length; i++)
            {
                if(this.snakes[i] !== undefined)
                    this.snakes[i].body.Move(this.snakes[i].direction, this.snakes[i].index);   
            }
        }, fps);
    }
}
