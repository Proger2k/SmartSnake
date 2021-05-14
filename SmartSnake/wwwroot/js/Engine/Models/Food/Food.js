class Food
{
    constructor(height, width)
    {
        this.height = height;
        this.width = width;
        this.X = null;
        this.Y = null;
        this.el = null;
    }
    
    GetRandomInt(max)
    {
        return Math.floor(Math.random() * Math.floor(max));
    }
}