using System;
using System.Drawing;
using System.Windows.Forms;

namespace SmartSnake.Game
{
	public class Snake
	{
		public MyPoint[] Body { get; set; }
		public int Length { get; set; }
		public int MaxLength { get; private set; }
		public double BodyWidth { get; private set; }
		public int Speed { get; private set; }
		public double HeadTurningSpeed { get; private set; }
		public double Direction { get; set; } // от 0 до 2*Pi

		public Snake(MyPoint[] body, int length, int maxLength,  double bodyWidth, double direction, int speed, double headTurningSpeed)
		{
			Body = body;
			Length = length;
			MaxLength = maxLength;
			Direction = direction;
			BodyWidth = bodyWidth;
			Speed = speed;
			HeadTurningSpeed = headTurningSpeed;
		}

		public void Move(int direction)
		{
			switch(direction)
			{
				case 1:
					CalculateDirection(-HeadTurningSpeed);
					break;
				case 2:
					CalculateDirection(HeadTurningSpeed);
					break;
			}

			double[] projectedSpeed = CalculateProjectedSpeed();

			for(int i = 0; i < Length - 1; i++)
			{
				Body[i].X = Body[i + 1].X;
				Body[i].Y = Body[i + 1].Y;
			}

			Body[Length - 1].X += (float)projectedSpeed[0];
			Body[Length - 1].Y += (float)projectedSpeed[1];
		}

		public void CalculateDirection(double deltaPhi)
		{
			Direction += deltaPhi;
			if (Direction >= 2 * Math.PI)
				Direction -= 2 * Math.PI;
			else if (Direction <= 0)
				Direction += 2 * Math.PI;
		}

		public double[] CalculateProjectedSpeed()
		{
			double Vx = Speed * Math.Cos(Direction);
			double Vy = Speed * Math.Sin(Direction);

			return new double[2] { Vx, Vy};
		}

		public void Draw(PaintEventArgs e, int direction)
		{
			Move(direction);

			SolidBrush b = new SolidBrush(Color.Brown);
			for (int i = 1; i < Length; i++)
			{
				e.Graphics.FillEllipse(b, Body[i].X, Body[i].Y, 20, 20);
			}
			SolidBrush b1 = new SolidBrush(Color.Black);
			e.Graphics.FillEllipse(b1, Body[Length - 1].X, Body[Length - 1].Y, 20, 20);
		}
	}
}
