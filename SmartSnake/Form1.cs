using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SmartSnake
{
	public partial class Form1 : Form
	{
		public Form1()
		{
			InitializeComponent();
		}

		private void panel1_Paint(object sender, PaintEventArgs e)
		{
		}

		private void timer1_Tick(object sender, EventArgs e)
		{
			panel1.Invalidate();
		}

		private void Form1_KeyDown(object sender, KeyEventArgs e)
		{
		}
	}
}
