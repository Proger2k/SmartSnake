class Food
{
    constructor(index, height, width, coordinates)
    {
        this.index = index;
        this.coordinates = coordinates;
        this.height = height;
        this.width = width;
    }

    GetRandomArbitrary(min, max) 
    {
        return Math.random() * (max - min) + min;
    }
}