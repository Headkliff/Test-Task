namespace DemoApp.Shared.CQRS.Interfaces.Commands
{
    public interface ICommandDispatcher
    {
        void Execute<TCommnad>(TCommnad command) where TCommnad : ICommand;
    }
}
