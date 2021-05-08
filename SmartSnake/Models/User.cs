using Microsoft.AspNetCore.Identity;

namespace SmartSnake.Models
{
    public class User : IdentityUser
    {
        public int Age { get; set; }
        public double BestScore { get; set; }
    }
}