using DemoApp.Core.Models.Post;
using DemoApp.Shared.CQRS.Interfaces.Queries;

namespace DemoApp.Core.CQRS.Post.Queries
{
    public class PostQuery : IQuery<PostWithCommentsADO>
    {
        public long PostId { get; set; }
    }
}
