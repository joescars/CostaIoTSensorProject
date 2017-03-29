using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TwilioResponder.Startup))]
namespace TwilioResponder
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
