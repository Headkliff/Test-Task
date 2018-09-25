using System.Threading.Tasks;
using System.Web.Http;
using DemoApp.Data.Models.Models;
using DemoApp.Shared.CQRS.Interfaces.Commands;
using DemoApp.Shared.CQRS.Interfaces.Queries;
using DemoApp.Shared.CQRS.Queries;

namespace DemoWebApp.Controllers
{
    public class PostsController : ApiController
    {

        private readonly IQueryDispatcher _queryDispatcher;
        private readonly ICommandDispatcher _commandDispatcher;

        public PostsController(IQueryDispatcher dispatcher, ICommandDispatcher cDisp)
        {
            _queryDispatcher = dispatcher;
            _commandDispatcher = cDisp;
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetAllPosts()
        {
            Post[] posts = _queryDispatcher.Execute<GetAllPostsQuery, Post[]>(new GetAllPostsQuery());
            return Ok(posts);
        }
    }
}
