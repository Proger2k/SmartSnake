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
    }

    Initialization()
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

        let snake = new Snake(head, body);

        let apple = new Apple(this.numberOfApples, this.height, this.width);
        apple.Initialization();
        
        snake.Draw();
        
        let snakes = new Array(1);
        snakes[0] = snake;
         let interval = new Interval(snakes);
         interval.Move();
        
        let snakeController = new SnakeController(snake);
        snakeController.Movement();
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