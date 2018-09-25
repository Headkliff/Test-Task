namespace DemoApp.Shared.CQRS.Interfaces.Queries
{
    public interface IQueryHandler<in TQuery, out TResult> where TQuery : IQuery<TResult>
    {
        TResult Execute(TQuery commnad);
    }
}
