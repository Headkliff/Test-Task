using System.Web.Http;
using System.Web.Mvc;
using DemoWebApp.Job;

namespace DemoWebApp
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AutofacConfig.ConfigureContainer();

            GlobalConfiguration.Configure(WebApiConfig.Register);
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);

            HapParserJobScheduler hapscheduler = new HapParserJobScheduler();
            RssParserJobScheduler rssscheduler = new RssParserJobScheduler();
            hapscheduler.Start();
            rssscheduler.Start();
        }
    }
}
