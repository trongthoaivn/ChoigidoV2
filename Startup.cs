using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Choigido.Startup))]
namespace Choigido
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
