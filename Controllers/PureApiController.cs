using Choigido.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Choigido.Controllers
{
    public class PureApiController : ApiController
    {
        [HttpGet]
        [Route("api/day")]
        public IHttpActionResult day()
        {
            return Json(new
            {
                message = "ok"
            });
        }

        [HttpGet]
        [Route("api/CreateRoom")]
        public IHttpActionResult createRoom()
        {
            string day = DateTime.Now.ToString("dd");
            string min = DateTime.Now.ToString("mm");
            string sec = DateTime.Now.ToString("ss");
            string MaPhong = "Room" + day + "" + min + "" + sec;

            //Lưu vào database
            tblChessGame room = new tblChessGame();
            room.GameID = MaPhong;

            if (new DAOController().createRoom(room))
            {
                //return mã phòng
                return Json(new
                {
                    RoomID = MaPhong
                });
            }
            else
            {
                return Json(new
                {
                    RoomID = "Lỗi"
                });
            }
        }

        [HttpGet]
        [Route("api/CheckRoom")]
        public IHttpActionResult CheckRoom(string Id)
        {
            if (new DAOController().getRoomInf(Id) != null && new DAOController().checkFullPlayer(Id))
            {
                var room = new DAOController().getRoomInf(Id);
                return Json(new
                {
                    RoomID = room.GameID,
                    BlackId = room.PlayerBlackID,
                    WhiteId = room.PlayerWhiteID
                });
            }
            else
            {
                return Json(new
                {
                    RoomID = "Null"
                });
            }
        }

        [HttpGet]
        [Route("api/GetRoomInf")]
        public IHttpActionResult GetRoomInf(string Id)
        {
            if (new DAOController().getRoomInf(Id) != null)
            {
                var room = new DAOController().getRoomInf(Id);
                return Json(new
                {
                    RoomID = room.GameID,
                    BlackId = room.PlayerBlackID,
                    WhiteId = room.PlayerWhiteID
                });
            }
            else
            {
                return Json(new
                {
                    RoomID = "Null"
                });
            }
        }

        [HttpGet]
        [Route("api/UpdateRoom")]
        public IHttpActionResult UpdateRoom(string Id, string Player)
        {
            if (new DAOController().updatePlayer(Id, Player))
            {
                var room = new DAOController().getRoomInf(Id);
                return Json(new
                {
                    RoomID = room.GameID,
                    BlackId = room.PlayerBlackID,
                    WhiteId = room.PlayerWhiteID
                });
            }
            else
            {
                return Json(new
                {
                    RoomID = "Null"
                });
            }
        }

        [HttpGet]
        [Route("api/GetAllRoom")]
        public IHttpActionResult GetAllRoom()
        {
            if(new DAOController().listRoom() != null)
            {
                return Json(new
                {
                    roomList = new DAOController().listRoom()
                });
            }
            else
            {
                return Json(new
                {
                    roomList = "Null"
                });
            }
        }

        [HttpGet]
        [Route("api/DeleteRoom")]
        public IHttpActionResult DeleteRoom(string Id)
        {
            if(new DAOController().deleteRoom(Id))
            {
                return Json(new
                {
                    check = "Ok"
                });
            }
            else
            {
                return Json(new
                {
                    check = "Null"
                });
            }
        }
    }
}
