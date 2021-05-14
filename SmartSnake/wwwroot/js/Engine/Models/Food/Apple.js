class Apple extends Food
{
    Initialization(apples, width, height)
    {
        for(let i = 0; i < apples.length; i++)
        {
            let x = this.GetRandomInt(width);
            let y = this.GetRandomInt(height);
            
            apples[i] = new Apple(this.width, this.height);
            
            apples[i].X = x;
            apples[i].Y = y;

            gameZone.innerHTML += `<div class="apple" id="apple ${i}" style="left: ${x}px; top: ${y}px;"></div>`
            
            apples[i].el = document.getElementById(`apple ${i}`);
        }
    }
}