using Microsoft.AspNetCore.Identity;

namespace SmartSnake.Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public int BestScore { get; set; }
        public int Rating { get; set; }
    }
}