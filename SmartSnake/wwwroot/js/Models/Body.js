class Body
{
    constructor(head, length, bodyWidth, coordinates)
    {
        this.head = head;
        this.length = length;
        this.bodyWindth = bodyWidth;
        this.coordinates = coordinates;
    } 
    
    Move(direction)
    {
        for (let i = 0; i < this.length - 2; i++)
        {
            this.coordinates[i].X = this.coordinates[i + 1].X;
            this.coordinates[i].Y = this.coordinates[i + 1].Y;
        }
        
        this.coordinates[this.length - 1].X = this.head.coordinates.X;
        this.coordinates[this.length - 1].Y = this.head.coordinates.Y;
        
        this.head.Move(direction);
    }
}