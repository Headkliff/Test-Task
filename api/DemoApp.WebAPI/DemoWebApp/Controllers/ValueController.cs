using System.Web.Http;
using DemoWebApp.JWT;

namespace DemoWebApp.Controllers
{
    public class ValueController : ApiController
    {
        [JwtAuthentication]
        public string Get()
        {
            return "value";
        }
    }
}
