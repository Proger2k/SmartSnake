class Head
{
    constructor(direction, speed, headTurningSpeed, coordinates)
    {
        this.direction = direction;
        this.speed = speed;
        this.headTurningSpeed = headTurningSpeed;
        this.coordinates = coordinates;
    }
    
    Move(direction)
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
        
        this.coordinates.Y = projectedHeadSpeed[0];
        this.coordinates.X = projectedHeadSpeed[1];
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