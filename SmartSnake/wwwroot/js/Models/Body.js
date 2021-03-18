class Body
{
    constructor(head, length, coordinates)
    {
        this.head = head;
        this.length = length;
        this.coordinates = coordinates;
    } 
    
    Move(direction)
    {
        for (let i = 0; i < this.length - 1; i++)
        {
            this.coordinates[i].X = this.coordinates[i + 1].X;
            this.coordinates[i].Y = this.coordinates[i + 1].Y;
        }
        
        this.coordinates[this.length - 1].X = this.head.coordinates.X;
        this.coordinates[this.length - 1].Y = this.head.coordinates.Y;
        
        for(let i = 0; i < this.length; i++)
        {
            let el = document.getElementById(`body ${i}`);
            el.style.left = `${this.coordinates[i].X}px`;
            el.style.top = `${this.coordinates[i].Y}px`;
        }
        
        this.head.Move(direction);
    }
}