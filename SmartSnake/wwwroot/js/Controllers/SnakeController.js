function movement() 
{
    document.addEventListener("keydown", (e) => {
        switch (e.keyCode) {
            case 39:
                // right
                snake.direction = 2;
                break
            case 37:
                // left
                snake.direction = 1;
                break
        }
    })

    document.addEventListener("keyup", (e) => {
        switch (e.keyCode) {
            case 39:
                snake.direction = -1;
                break

            case 37:
                snake.direction = -1;
                break
        }
    })
}