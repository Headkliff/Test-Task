namespace DemoApp.Shared.CQRS.Interfaces.Commands
{
    public interface ICommandHandler<in TCommand> where TCommand : ICommand
    {
        void Execute(TCommand commnad);
    }
}
