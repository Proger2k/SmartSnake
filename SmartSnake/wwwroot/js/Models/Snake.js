class Snake
{
    constructor(head, body) 
    {
        this.head = head;
        this.body = body;
        this.direction = -1;
    }
    
    Intervals()
    {
        this.snakeMove = setInterval(() => {
            
            this.body.Move(this.direction);
        }, fps);
    }
    
    Draw()
    {
        for(let i = 0; i < this.body.length; i++)
        {
            gameZone.innerHTML += `<div class="body" id="body ${i}" style="left: ${this.body.coordinates[i].X}px; top: ${this.body.coordinates[i].Y}px;"></div>`
        }
        
        gameZone.innerHTML += `<div class="head" style="left: ${this.head.coordinates.X}px; top: ${this.head.coordinates.Y}px;"></div>`
        this.head.el = document.querySelector('.head');
    }
}