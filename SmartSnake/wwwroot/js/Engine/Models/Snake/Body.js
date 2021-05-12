class Body
{
    constructor(head, coordinates)
    {
        this.head = head;
        this.coordinates = coordinates;
    } 
    
    Move(direction, index)
    {
        for (let i = 0; i < this.coordinates.length - 1; i++)
        {
            this.coordinates[i].X = this.coordinates[i + 1].X;
            this.coordinates[i].Y = this.coordinates[i + 1].Y;
        }
        
        this.coordinates[this.coordinates.length - 1].X = this.head.coordinates.X;
        this.coordinates[this.coordinates.length - 1].Y = this.head.coordinates.Y;
        
        for(let i = 0; i < this.coordinates.length; i++)
        {
            let el = document.getElementById(`${index} body ${i}`);
            el.style.left = `${this.coordinates[i].X}px`;
            el.style.top = `${this.coordinates[i].Y}px`;
        }
        
        this.head.Move(this, direction, index);
    }
}