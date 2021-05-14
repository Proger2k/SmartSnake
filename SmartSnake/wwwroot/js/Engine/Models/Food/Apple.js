class Apple extends Food
{
    Initialization()
    {
        for(let i = 0; i < this.count; i++)
        {
            let x = this.GetRandomInt(this.width);
            let y = this.GetRandomInt(this.height);

            gameZone.innerHTML += `<div class="apple" id="apple ${i}" style="left: ${x}px; top: ${y}px;"></div>`
        }
    }
}