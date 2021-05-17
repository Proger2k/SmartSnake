using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SmartSnake.Models;

namespace SmartSnake
{
    
    [Authorize]
    public class GameHub : Hub
    {
        public async Task Send(GameHubModel model)
        {
            model.ConnectionId = Context.ConnectionId;
            await Clients.Others.SendAsync("Receive", model);
        }

        public override async Task OnConnectedAsync()
        {
            await Clients.Others.SendAsync("Notify", $"{Context.ConnectionId}", "1");
            await Clients.Caller.SendAsync("Notify", $"{Context.ConnectionId}", "0");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.All.SendAsync("Notify", $"{Context.ConnectionId}", "-1");
            await base.OnDisconnectedAsync(exception);
        }
    }
}