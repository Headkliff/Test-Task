using System.Linq;
using DemoApp.Data.Implementation;
using DemoApp.Data.Models.Models;
using DemoApp.Shared.CQRS.Interfaces.Queries;

namespace DemoApp.Shared.CQRS.Queries
{
    public class GetAllPostsQueryHandler : IQueryHandler<GetAllPostsQuery, Post[]>
    {
        private readonly DataBaseContext _context;

        public GetAllPostsQueryHandler(DataBaseContext context)
        {
            _context = context;
        }

        public Post[] Execute(GetAllPostsQuery query)
        {
            var posts = _context.Posts.ToArray();
            return posts;
        }
    }
}
