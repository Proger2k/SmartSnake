﻿using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task SendApple(int index, double x, double y)
        {
            await Clients.Others.SendAsync("ReceiveApple", index, x, y);
        }

        public async Task SendPineapples(Pineapple[] pineapples)
        {
            await Clients.Others.SendAsync("ReceivePineapples", pineapples);
        }
        
        public async Task SendPineapple(int index)
        {
            await Clients.Others.SendAsync("ReceivePineapple", index);
        }
        
        public async Task ReceiveApples()
        {
            await Clients.Others.SendAsync("SendApples");
        }
        
        public async Task ReceivePineapples()
        {
            await Clients.Others.SendAsync("SendPineapples");
        }
        
        public async Task BeginningOfTheGame()
        {
            await Clients.Others.SendAsync("BeginningOfTheGame");
        }

        public async Task SendUser(bool isStarted)
        {
            string connectionId = Context.ConnectionId;
            await Clients.Others.SendAsync("ReceiveUser", connectionId, isStarted);
        }

        public async Task AddUser(PlayerConnection playerConnection)
        {
            HashSet<string> users;
            if (Context.Items.Keys.FirstOrDefault(x => x.ToString() == "users") == null)
            {
                users = new HashSet<string> {playerConnection.ConnectionId};
                Context.Items.Add("users", users);
                Context.Items.Add("isStarted", false);
            }
            else
            {
                users = (HashSet<string>)Context.Items["users"];
                if (users != null)
                {
                    users.Add(playerConnection.ConnectionId);
                    Context.Items["users"] = users;
                }
            }

            if (Context.Items["isStarted"] != null)
            {
                if (users != null && users.Count == 3 && (bool)Context.Items["isStarted"] == false && !playerConnection.IsGameBegun)
                {
                    Context.Items["isStarted"] = true;
                    await Clients.Caller.SendAsync("BeginningOfTheGame");
                }
                else if ((bool)Context.Items["isStarted"] == false && playerConnection.IsGameBegun)
                {
                    Context.Items["isStarted"] = true;
                    await Clients.Caller.SendAsync("ConnectToTheGame");
                }
            }
        }

        public override async Task OnConnectedAsync()
        {
            if (Context.Items.Keys.FirstOrDefault(x => x.ToString() == "users") == null)
            {
                HashSet<string> users = new HashSet<string> {Context.ConnectionId};
                Context.Items.Add("users", users);
                Context.Items.Add("isStarted", false);
            }
            
            await Clients.Others.SendAsync("Notify", $"{Context.ConnectionId}", "1");
            await Clients.Caller.SendAsync("Notify", $"{Context.ConnectionId}", "0");

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.All.SendAsync("Notify", $"{Context.ConnectionId}", "-1");
            await base.OnDisconnectedAsync(exception);
        }

        public void RemoveUser(string connectionId)
        {
            if (Context.Items.Keys.FirstOrDefault(x => x.ToString() == "users") != null)
            {
                HashSet<string> users = (HashSet<string>)Context.Items["users"];
                users?.Remove(connectionId);

                Context.Items["users"] = users;
            }   
        }
    }
}