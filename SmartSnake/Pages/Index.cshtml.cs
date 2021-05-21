using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SmartSnake.Models;

namespace SmartSnake.Pages.Menu
{
    [Authorize]
    public class Index : PageModel
    {
        private readonly SignInManager<User> _signInManager;

        public Index(SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
        }

        public void OnGet()
        { }
    }
}