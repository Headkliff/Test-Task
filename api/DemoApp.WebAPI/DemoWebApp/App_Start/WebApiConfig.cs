using System.Net.Http.Headers;
using System.Web.Http;

namespace DemoWebApp
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Formatters.JsonFormatter.SupportedMediaTypes
                .Add(new MediaTypeHeaderValue("text/html"));

            // Web API routes

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "PostApi",
                routeTemplate: "api/posts/{postId}",
                defaults: new { postId = RouteParameter.Optional, controller = "Posts" }
            );

            config.Routes.MapHttpRoute(
                name: "CommentApi",
                routeTemplate: "api/comments/{commentId}",
                defaults: new { commentId = RouteParameter.Optional, controller = "Comments" }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
