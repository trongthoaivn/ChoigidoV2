using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace Choigido.Hubs
{
    [HubName("serverHub")]
    public class Hubs : Hub
    {
        Boolean wb = true;
        public async Task JoinRoom(string roomName, string name)
        {
            await Groups.Add(Context.ConnectionId, roomName);
            Clients.Group(roomName).addChatMessage(Context.User.Identity.Name +" ("+ name + " ) joined.");
        }

        public async Task LeaveRoom(string roomName, string name)
        {
            await Groups.Remove(Context.ConnectionId, roomName);
            Clients.Group(roomName).addChatMessage(Context.User.Identity.Name + name + " leave.");
        }
        public async Task Send(string group, string message)
        {
            // Call the addMessage method on all clients            
            Clients.Group(group).addChatMessage(Context.User.Identity.Name + "Group Message " + message);
        }
        public void updateplayer(string group, string message)
        {
            Clients.Group(group).player(message);
        }
        public void set_turn(string group,string msg)
        {
            Clients.OthersInGroup(group).get_turn(msg);
        }

        public void send_move(string group , string ol ,string ne)
        {
            Clients.OthersInGroup(group).make_move(ol,ne);
        }
        public void sendMessage(string group, string name, string message)
        {
            Clients.OthersInGroup(group).getMessage(name +" : "+message);
        }
    }
}