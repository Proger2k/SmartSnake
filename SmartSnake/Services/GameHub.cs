using System;
using System.Collections.Generic;
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
        private List<string> _users;
        private bool _isStarted = false;
        
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

        public async Task BeginningOfTheGame()
        {
            await Clients.Others.SendAsync("BeginningOfTheGame");
        }

        public override async Task OnConnectedAsync()
        {
            _users ??= new List<string>();
            
            _users.Add(Context.ConnectionId);
            await Clients.Others.SendAsync("Notify", $"{Context.ConnectionId}", "1");
            await Clients.Caller.SendAsync("Notify", $"{Context.ConnectionId}", "0");

            if (_users.Count == 3 && !_isStarted)
            {
                _isStarted = true;
                await Clients.Caller.SendAsync("GenerateApples");
            }
            
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            _users.Remove(Context.ConnectionId);
            
            if (_users.Count == 0)
                _isStarted = false;
            
            await Clients.All.SendAsync("Notify", $"{Context.ConnectionId}", "-1");
            await base.OnDisconnectedAsync(exception);
        }
    }
}