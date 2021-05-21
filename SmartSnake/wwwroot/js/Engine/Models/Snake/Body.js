class Body
{
    constructor(head, coordinates, width, height)
    {
        this.head = head;
        this.coordinates = coordinates;
        this.width = width;
        this.height = height;
    } 
    
    Move(direction, index)
    {
        for (let i = 0; i < this.coordinates.length - 1; i++)
        {
            this.coordinates[i].x = this.coordinates[i + 1].x;
            this.coordinates[i].y = this.coordinates[i + 1].y;
        }
        
        this.coordinates[this.coordinates.length - 1].x = this.head.coordinates.x;
        this.coordinates[this.coordinates.length - 1].y = this.head.coordinates.y;
        
        for(let i = 0; i < this.coordinates.length; i++)
        {
            let el = document.getElementById(`${index} body ${i}`);
            el.style.left = `${this.coordinates[i].x}px`;
            el.style.top = `${this.coordinates[i].y}px`;
        }
        
        this.head.Move(this, direction, index);
    }
}