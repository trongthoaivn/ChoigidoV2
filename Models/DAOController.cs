using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Choigido.Models
{
    public class DAOController
    {
        private DAO dao;
        public DAOController()
        {
            dao = new DAO();
        }
        public bool createRoom(tblChessGame room)
        {
            dao.tblChessGame.Add(room);
            dao.SaveChanges();
            return true;
        }

        public tblChessGame getRoomInf(string Id)
        {
            var room = dao.tblChessGame.FirstOrDefault(p => p.GameID.Equals(Id));
            if (room != null)
            {
                return room;
            }
            else
            {
                return null;
            }
        }

        public bool checkFullPlayer(string Id)
        {
            bool flag = false;
            var room = dao.tblChessGame.FirstOrDefault(p => p.GameID.Equals(Id));
            if (room.PlayerBlackID == null)
            {
                flag = true;
            }
            else
            {
                flag = false;
            }
            return flag;
        }

        public bool updatePlayer(string Id, string MaNguoiChoi)
        {
            bool flag = false;
            var room = dao.tblChessGame.FirstOrDefault(p => p.GameID.Equals(Id));
            if (room != null)
            {
                if (room.PlayerWhiteID == null)
                {
                    room.PlayerWhiteID = MaNguoiChoi;
                    dao.SaveChanges();
                }
                else if(room.PlayerBlackID == null)
                {
                    room.PlayerBlackID = MaNguoiChoi;
                    dao.SaveChanges();
                }
                flag = true;
            }
            else
            {
                flag = false;
            }
            return flag;
        }
    }
}