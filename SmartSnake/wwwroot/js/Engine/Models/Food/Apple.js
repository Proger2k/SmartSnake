class Apple
{
    constructor(count, height, width) 
    {
        this.count = count;
        this.height = height;
        this.width = width;
    }
    
    Initialization()
    {
        for(let i = 0; i < this.count; i++)
        {
            let x = this.GetRandomInt(this.width);
            let y = this.GetRandomInt(this.height);

            gameZone.innerHTML += `<div class="apple" id="apple ${i}" style="left: ${x}px; top: ${y}px;"></div>`
        }
    }

    GetRandomInt(max)
    {
        return Math.floor(Math.random() * Math.floor(max));
    }
}