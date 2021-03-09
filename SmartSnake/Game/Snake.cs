using System.Drawing;
using System.Windows.Forms;

namespace SmartSnake.Game
{
	public class Snake
	{
		public Point[] Body { get; set; }
		public int MaxLenght { get; private set; }
		public double BodyWidth { get; private set; }
		public int Speed { get; private set; }
		public double HeadTurningSpeed { get; private set; }
		public double Direction { get; set; } // от 0 до 2*Pi

		public Snake(Point[] body, int maxLenght, double bodyWidth, int speed, int headTurningSpeed)
		{
			Body = body;
			MaxLenght = maxLenght;
			BodyWidth = bodyWidth;
			Speed = speed;
			HeadTurningSpeed = headTurningSpeed;
		}

		public void Move(KeyEventArgs e)
		{
			switch(e.KeyCode)
			{
				case Keys.Left:
					break;
				case Keys.Up:
					break;
				default:
					break;
			}
		}
	}
}
