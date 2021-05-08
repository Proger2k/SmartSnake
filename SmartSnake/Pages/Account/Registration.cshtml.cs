using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SmartSnake.Pages.Account
{
    public class Registration : PageModel
    {
        
        public class RegisterViewModel
        {
            [Required]
            public string Name { get; set; }

            [Required]
            public string Email { get; set; }

            [Required]
            public int Year { get; set; }

            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            [Required]
            [Compare("Password", ErrorMessage = "Password mismatch")]
            [DataType(DataType.Password)]
            public string PasswordConfirm { get; set; }
        }
        public void OnGet()
        {
            
        }
    }
}