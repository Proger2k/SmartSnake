using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SmartSnake.Data;
using SmartSnake.Models;

namespace SmartSnake
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		private readonly IConfiguration _configuration;
		
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddDbContext<ApplicationDbContext>(options =>
				options.UseSqlServer(
					_configuration.GetConnectionString("DefaultConnection")));
			
			services.AddIdentity<User, IdentityRole>(opts =>
				{
					opts.Password.RequiredLength = 3;
					opts.Password.RequireNonAlphanumeric = false;
					opts.Password.RequireLowercase = false;
					opts.Password.RequireUppercase = false;
					opts.Password.RequireDigit = false;
				})
				.AddEntityFrameworkStores<ApplicationDbContext>();
			
			services.AddSignalR(hubOptions =>
			{
				hubOptions.EnableDetailedErrors = true;
				hubOptions.KeepAliveInterval = System.TimeSpan.FromMinutes(1);
			});
			
			services.AddRazorPages();
		}
		
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			app.UseStaticFiles();

			app.UseRouting();

			app.UseAuthorization();
			
			app.UseEndpoints(endpoints =>
			{
				endpoints.MapHub<GameHub>("/game");
				endpoints.MapControllers();
			});

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapRazorPages();
			});
		}
	}
}
