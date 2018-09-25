using DemoApp.Data.Models.Models;
using DemoApp.Shared.CQRS.Interfaces.Queries;

namespace DemoApp.Shared.CQRS.Queries
{
    public class GetAllPostsQuery : IQuery<Post[]>
    {
        public GetAllPostsQuery()
        {

        }
    }
}
