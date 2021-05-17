namespace SmartSnake.Models.Apple
{
    public abstract class Food
    {
        public int Index { get; set; }
        public Coordinates Coordinates { get; set; }
        public double Height { get; set; }
        public double Width { get; set; }
    }
}