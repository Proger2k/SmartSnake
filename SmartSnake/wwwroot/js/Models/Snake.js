class Snake
{
    constructor(head, body) 
    {
        this.head = head;
        this.body = body;
    }
    
    Intervals()
    {
        this.snakeMove = setInterval(() => {
            
            this.body.Move(-1);
        }, fps);
    }
    
    Draw()
    {
        for(let i = 0; i < this.body.length; i++)
        {
            gameZone.innerHTML += `<div class="body" style="left: ${this.body.coordinates[i].X}px; top: ${this.body.coordinates[i].Y}px;"></div>`
        }
        
        gameZone.innerHTML += `<div class="head" style="left: ${this.head.coordinates.X}px; top: ${this.head.coordinates.Y}px;"></div>`
    }
}