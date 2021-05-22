using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SmartSnake.Data;
using SmartSnake.Models;

namespace SmartSnake.Pages.Game
{
    public class Rating : PageModel
    {
        private readonly ApplicationDbContext _db;
        public List<User> Users { get; set; }

        public Rating(ApplicationDbContext db)
        {
            _db = db;
        }
        
        public void OnGet()
        {
            Users = _db.Users.OrderByDescending(r => r.Rating).ToList();
        }
    }
}