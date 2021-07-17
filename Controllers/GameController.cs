using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Choigido.Controllers
{
    public class GameController : Controller
    {
        // GET: Game
        public ActionResult GameRoom()
        {
            return View();
        }

        public ActionResult Lobby()
        {
            return View();
        }

        public ActionResult PvE()
        {
            return View();
        }
    }
}