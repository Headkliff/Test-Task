using System;
using Autofac;
using DemoApp.Shared.CQRS.Interfaces.Commands;
using IContainer = Autofac.IContainer;

namespace DemoWebApp.CQRS
{
    public class CommandDispatcher:ICommandDispatcher
    {
        private readonly IContainer _container = AutofacConfig.Container;

        public void Execute<TCommnad>(TCommnad command) where TCommnad : ICommand
        {
            if (command == null)
            {
                throw new ArgumentNullException("command");
            }
            var handler = _container.Resolve<ICommandHandler<TCommnad>>();

            if (handler == null)
            {
                throw new InvalidOperationException($"Handler for type {typeof(TCommnad)} not found");
            }
            handler.Execute(command);
        }
    }
}
