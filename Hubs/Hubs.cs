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
        public async Task JoinRoom(string roomName, string name)
        {
            await Groups.Add(Context.ConnectionId, roomName);
            Clients.Group(roomName).addChatMessage(Context.User.Identity.Name + " (" + name + ") joined.");
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
        public void set_turn(string group, string msg)
        {
            Clients.OthersInGroup(group).get_turn(msg);
        }

        public void send_move(string group, string ol, string ne)
        {
            Clients.OthersInGroup(group).make_move(ol, ne);
        }
        public void sendMessage(string group, string name, string message)
        {
            Clients.OthersInGroup(group).getMessage(name + " : " + message);
        }

        public void sendFen(string group, string ol, string ne, string fen)
        {
            Clients.Group(group).getFen(ol, ne, fen);
        }

        public void setKayleSpeech(string group, string msg)
        {
            Clients.Group(group).getKayleSpeech(msg);
        }

        public void sendRequest(string group, string msg, string fen)
        {
            Clients.OthersInGroup(group).getReply(msg, fen);
        }

        public void sendUpdateBoard(string group, string fen)
        {
            Clients.Group(group).setUpdateBoard(fen);
        }

        public void sendWinMsg(string group, string name)
        {
            Clients.Group(group).setWin(name);
        }

        public void alertLeaveBoard(string group, string msg)
        {
            Clients.OthersInGroup(group).getAlertLeave(msg);
        }

        public void setloadGame(string group , string fen)
        {
            Clients.Group(group).getloadGame(fen);
        }
    }
}