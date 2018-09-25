using System;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Collections.Generic;
using DemoWebApp;
using Swagger.Net.Application;
using Swagger.Net;

[assembly: PreApplicationStartMethod(typeof(SwaggerConfig), "Register")]

namespace DemoWebApp
{
    public class SwaggerConfig
    {
        public static void Register()
        {
            var thisAssembly = typeof(SwaggerConfig).Assembly;

            GlobalConfiguration.Configuration
                .EnableSwagger(c =>
                    {                       
                        c.SingleApiVersion("v1", "DemoWebApp");                       
                        c.AccessControlAllowOrigin("*");                        
                        c.IncludeAllXmlComments(thisAssembly, AppDomain.CurrentDomain.BaseDirectory);
                        c.IgnoreIsSpecifiedMembers();                        
                        c.DescribeAllEnumsAsStrings(camelCase: false);
                    })
                .EnableSwaggerUi(c =>
                    {                        
                        c.ShowExtensions(true);                        
                        c.SetValidatorUrl("https://online.swagger.io/validator");                        
                        c.UImaxDisplayedTags(100);
                        c.UIfilter("''");                        
                    });
        }

        public static bool ResolveVersionSupportByRouteConstraint(ApiDescription apiDesc, string targetApiVersion)
        {
            return (apiDesc.Route.RouteTemplate.ToLower().Contains(targetApiVersion.ToLower()));
        }

        public class AssignOAuth2SecurityRequirements : IOperationFilter
        {
            public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
            {
                // Correspond each "Authorize" role to an oauth2 scope
                var scopes = apiDescription.ActionDescriptor.GetFilterPipeline()
                    .Select(filterInfo => filterInfo.Instance)
                    .OfType<AuthorizeAttribute>()
                    .SelectMany(attr => attr.Roles.Split(','))
                    .Distinct();

                if (scopes.Any())
                {
                    if (operation.security == null)
                        operation.security = new List<IDictionary<string, IEnumerable<string>>>();

                    var oAuthRequirements = new Dictionary<string, IEnumerable<string>>
                    {
                        { "oauth2", scopes }
                    };

                    operation.security.Add(oAuthRequirements);
                }
            }
        }
    }
}
