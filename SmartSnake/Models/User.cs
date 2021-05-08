using Microsoft.AspNetCore.Identity;

namespace SmartSnake.Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public double BestScore { get; set; }
    }
}