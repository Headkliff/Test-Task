using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using DemoApp.Core.Services;
using DemoApp.Core.Tools.Parser;
using DemoApp.Data.Implementation;
using DemoApp.Data.Models.Models;
using DemoApp.Shared.CQRS.Queries;
using DemoApp.Shared.CQRS.Interfaces.Queries;
using DemoApp.Shared.CQRS.Interfaces.Commands;
using DemoApp.Shared.CQRS.Commands;
using DemoWebApp.CQRS;
using Quartz;
using Quartz.Impl;

namespace DemoWebApp
{
    public class AutofacConfig
    {
        public static IContainer Container;

        public static void ConfigureContainer()
        {
            var builder = new ContainerBuilder();

            var config = GlobalConfiguration.Configuration;

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            builder.RegisterType<DataBaseContext>().AsSelf();

            builder.RegisterWebApiModelBinderProvider();

            builder.Register(x => new StdSchedulerFactory().GetScheduler().Result).As<IScheduler>();
            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly()).Where(x => typeof(IJob).IsAssignableFrom(x));

            builder.RegisterType<GetAllPostsQuery>().As<IQuery<Post[]>>();
            builder.RegisterType<GetAllPostsQueryHandler>().As<IQueryHandler<GetAllPostsQuery, Post[]>>();
            builder.RegisterType<QueryDispatcher>()
                .As<IQueryDispatcher>();

            builder.RegisterType<CreatePostCommand>().As<ICommand>();
            builder.RegisterType<CreatePostCommandHandler>().As<ICommandHandler<CreatePostCommand>>();
            builder.RegisterType<CommandDispatcher>()
                .As<ICommandDispatcher>();

            builder.RegisterType<HapParser>().Named<IParser>("Hap");
            builder.RegisterType<RssParser>().Named<IParser>("Rss");

            builder.RegisterType<DataBaseContext>().AsSelf();

            Container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(Container);

        }
    }
}