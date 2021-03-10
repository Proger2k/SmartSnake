using SmartSnake.Game;
using System;
using System.Reflection;
using System.Windows.Forms;

namespace SmartSnake
{
	public partial class Form1 : Form
	{
		Snake[] snakes;
		int len = 50;
		int direction;

		public Form1()
		{
			InitializeComponent();
			panel1.GetType().GetMethod("SetStyle", BindingFlags.NonPublic | BindingFlags.Instance).Invoke(panel1, new object[] { ControlStyles.AllPaintingInWmPaint | ControlStyles.DoubleBuffer | ControlStyles.UserPaint, true });

			snakes = new Snake[1];
			var body = new MyPoint[200];

			for (int i = 0; i < len; i++)
			{
				body[i].X = 100;
				body[i].Y = 100 + i * 10;
			}

			snakes[0] = new Snake(body, len, 200, 20, (float)Math.PI/2, 2, (float)Math.PI/25);
		}

		private void panel1_Paint(object sender, PaintEventArgs e)
		{
			snakes[0].Draw(e, direction);
		}

		private void timer1_Tick(object sender, EventArgs e)
		{
			panel1.Invalidate();
		}

		private void Form1_KeyDown(object sender, KeyEventArgs e)
		{
			if (e.KeyCode == Keys.Left)
				direction = 1;
			else if (e.KeyCode == Keys.Right)
				direction = 2;
			else
				direction = 0;
		}

		private void Form1_KeyUp(object sender, KeyEventArgs e)
		{
			direction = 0;
		}
	}
}

