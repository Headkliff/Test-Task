using DemoApp.Data.Models.Models;
using DemoApp.Shared.CQRS.Interfaces.Queries;

namespace DemoApp.Shared.CQRS.Queries
{
    class GetAllCommentsQuery : IQuery<Comment[]>
    {

    }
}