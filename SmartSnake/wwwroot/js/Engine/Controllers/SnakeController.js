class SnakeController
{
    constructor(snake)
    {
        this.snake = snake;
    }
    
    Movement()
    {
        document.addEventListener("keydown", (e) => {
            switch (e.keyCode) {
                case 39:
                    // right
                    this.snake.direction = 2;
                    break
                case 37:
                    // left
                    this.snake.direction = 1;
                    break
            }
        })
    
        document.addEventListener("keyup", (e) => {
            switch (e.keyCode) {
                case 39:
                    this.snake.direction = -1;
                    break
    
                case 37:
                    this.snake.direction = -1;
                    break
            }
        })
    }
}

