using System;
using Autofac;
using DemoApp.Shared.CQRS.Interfaces.Queries;

namespace DemoWebApp.CQRS
{
    public class QueryDispatcher:IQueryDispatcher
    {
        private readonly IContainer _container = AutofacConfig.Container;

        public TResult Execute<TQuery, TResult>(TQuery query) where TQuery : IQuery<TResult>
        {
            if (query == null)
            {
                throw new ArgumentNullException("query");
            }
            var handler = _container.Resolve<IQueryHandler<TQuery, TResult>>();

            if (handler == null)
            {
                throw new InvalidOperationException($"Handler for type {typeof(TQuery)} not found");
            }
            return handler.Execute(query);
        }
    }
}
