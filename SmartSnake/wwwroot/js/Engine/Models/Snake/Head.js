class Head
{
    constructor(direction, speed, headTurningSpeed, coordinates)
    {
        this.direction = direction;
        this.speed = speed;
        this.headTurningSpeed = headTurningSpeed;
        this.coordinates = coordinates;
        this.el = null;
        this.height = 25;
        this.width = 25;
    }
    
    Move(body, direction, index)
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

        this.el = document.getElementById(`${index} head`);

        this.el.style.left = `${this.coordinates.X}px`;
        this.el.style.top = `${this.coordinates.Y}px`;
        this.el.style.transform = `rotate(${this.direction*180/(Math.PI)}deg)`;
        
        board.IsEaten(this, index);
        board.Crashed(this, body, index);
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