using System.Linq;
using DemoApp.Data.Implementation;
using DemoApp.Data.Models.Models;
using DemoApp.Shared.CQRS.Interfaces.Queries;

namespace DemoApp.Shared.CQRS.Queries
{
    class GetAllCommentsQueryHandler: IQueryHandler<GetAllCommentsQuery, Comment[]>
    {
        private readonly DataBaseContext _context;

        public GetAllCommentsQueryHandler(DataBaseContext context)
        {
            _context = context;
        }

        public Comment[] Execute(GetAllCommentsQuery query)
        {
            Comment[] comments = _context.Comments.ToArray();
            return comments;
        }
    }
}
