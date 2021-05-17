using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SmartSnake.Pages.Game.Online
{
    public class Restart : PageModel
    {
        public int Score { get; set; }
        public void OnGet(int score)
        {
            Score = score;
        }
    }
}