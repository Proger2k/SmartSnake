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

    GetRandomArbitrary(min, max) 
    {
        return Math.random() * (max - min) + min;
    }
}