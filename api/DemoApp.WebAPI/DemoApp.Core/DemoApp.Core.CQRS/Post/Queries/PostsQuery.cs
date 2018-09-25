using System.Collections.Generic;
using DemoApp.Core.Models.Post;
using DemoApp.Shared.CQRS.Interfaces.Queries;

namespace DemoApp.Core.CQRS.Post.Queries
{
    public class PostsQuery : IQuery<List<PostADO>>
    {
    }
}
