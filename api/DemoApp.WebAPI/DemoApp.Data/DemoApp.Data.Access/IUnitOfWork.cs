using System;

namespace DemoApp.Data.Access
{
    public interface IUnitOfWork : ITransactionManager, IDisposable
    {
    }
}
