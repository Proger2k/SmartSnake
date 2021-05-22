using System.Linq;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using SmartSnake.Data;
using SmartSnake.Models;

namespace SmartSnake.Pages.Game
{
    public class Restart : PageModel
    {
        private readonly ApplicationDbContext _db;
        public int Score { get; set; }
        public  int BestScore { get; set; }
        
        public Restart(ApplicationDbContext db)
        {
            _db = db;
        }
        public void OnGet(int score)
        {
            Score = score;
            User user = _db.Users.FirstOrDefault(x => x.UserName == User.Identity.Name);
            if (user != null)
            {
                if (user.BestScore < score)
                {
                    user.BestScore = score;
                    _db.SaveChangesAsync();
                }
                
                BestScore = user.BestScore;
            }
        }
    }
}