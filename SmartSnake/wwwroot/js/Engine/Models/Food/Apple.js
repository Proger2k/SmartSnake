class Apple extends Food
{
    Initialization(apples, width, height)
    {
        for(let i = 0; i < apples.length; i++)
        {
            let x = this.GetRandomArbitrary(160, width - 200);
            let y = this.GetRandomArbitrary(150, height - 200);
            
            apples[i] = new Apple(i, this.width, this.height, {X: x, Y: y});
            
            gameZone.innerHTML += `<div class="apple" id="apple ${i}" style="left: ${x}px; top: ${y}px;"></div>`
        }
    }
}