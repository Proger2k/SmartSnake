using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SmartSnake.Pages.Menu
{
    [Authorize]
    public class Index : PageModel
    {
        public void OnGet()
        {
            
        }
    }
}