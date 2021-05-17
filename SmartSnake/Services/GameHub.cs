using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SmartSnake.Models;
using SmartSnake.Models.Apple;

namespace SmartSnake
{
    
    [Authorize]
    public class GameHub : Hub
    {
        public async Task SendSnake(GameHubModel model)
        {
            model.ConnectionId = Context.ConnectionId;
            await Clients.Others.SendAsync("ReceiveSnake", model);
        }

        public async Task SendApples(Apple[] apples)
        {
            await Clients.Others.SendAsync("ReceiveApples", apples);
        }

        public async Task SendApple(Apple apple)
        {
            await Clients.Others.SendAsync("ReceiveApple", apple);
        }

        public async Task SendPineapple(Pineapple pineapple)
        {
            await Clients.Others.SendAsync("ReceivePineapple", pineapple);
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