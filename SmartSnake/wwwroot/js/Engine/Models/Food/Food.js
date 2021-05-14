class Food
{
    constructor(count, height, width)
    {
        this.count = count;
        this.height = height;
        this.width = width;
    }
    
    GetRandomInt(max)
    {
        return Math.floor(Math.random() * Math.floor(max));
    }
}