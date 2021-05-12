using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SmartSnake.Models;

namespace SmartSnake.Pages.Account
{
    [ValidateAntiForgeryToken]
    public class Login : PageModel
    {
        private readonly SignInManager<User> _signInManager;

        public Login(SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
        }
        
        [BindProperty]
        public LoginViewModeL Input { get; set; }
        
        public class LoginViewModeL
        {
            [Required]
            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required]
            [DataType(DataType.Password)]
            [Display(Name = "Password")]
            public string Password { get; set; }

            [Display(Name = "RememberMe?")]
            public bool RememberMe { get; set; }
        }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPost()
        {
            if (ModelState.IsValid)
            {
                var result =
                    await _signInManager.PasswordSignInAsync(Input.Email, Input.Password, true, false);
                if (result.Succeeded)
                {
                    return RedirectToPage("/Index");
                }
                ModelState.AddModelError("", "Неправильный логин и (или) пароль");
            }

            return Page();
        }
        
        public async Task<IActionResult> OnPostLogout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToPage("Login");
        }
    }
}