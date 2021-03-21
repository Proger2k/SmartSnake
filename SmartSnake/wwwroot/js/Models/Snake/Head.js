class Head
{
    constructor(direction, speed, headTurningSpeed, coordinates)
    {
        this.direction = direction;
        this.speed = speed;
        this.headTurningSpeed = headTurningSpeed;
        this.coordinates = coordinates;
        this.el = null;
    }
    
    Move(direction, index)
    {
        switch(direction)
        {
            case 1:
                this.CalculateDirection(-this.headTurningSpeed);
                break;
            case 2:
                this.CalculateDirection(this.headTurningSpeed);
                break;
        }
        let projectedHeadSpeed = this.CalculateProjectedSpeed();
        
        this.coordinates.X += projectedHeadSpeed.Vx;
        this.coordinates.Y += projectedHeadSpeed.Vy;

        let el = document.getElementById(`${index} head`);

        el.style.left = `${this.coordinates.X}px`;
        el.style.top = `${this.coordinates.Y}px`;
        el.style.transform = `rotate(${this.direction*180/(Math.PI)}deg)`;
        
        board.IsEaten(el);
        board.Crashed(el);
    }

    CalculateDirection(deltaPhi)
    {
        this.direction += deltaPhi;
        if (this.direction >= 2 * Math.PI)
            this.direction -= 2 * Math.PI;
        else if (this.direction <= 0)
            this.direction += 2 * Math.PI;
    }

    CalculateProjectedSpeed()
    {
        let Vx = this.speed * Math.cos(this.direction);
        let Vy = this.speed * Math.sin(this.direction);

        return  {Vx, Vy};
    }
}