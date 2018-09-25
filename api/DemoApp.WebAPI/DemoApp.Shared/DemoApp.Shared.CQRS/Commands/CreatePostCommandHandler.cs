using DemoApp.Data.Implementation;
using DemoApp.Data.Models.Models;
using DemoApp.Shared.CQRS.Interfaces.Commands;

namespace DemoApp.Shared.CQRS.Commands
{
    public class CreatePostCommandHandler : ICommandHandler<CreatePostCommand>
    {
        private readonly DataBaseContext _context;
        public CreatePostCommandHandler(DataBaseContext c)
        {
            _context = c;
        }
        public void Execute(CreatePostCommand command)
        {
            var posts = _context.Posts.Add(new Post()
            {
                PostId = command.PostId,
                Index = command.Index,
                Title = command.Title,
                DateTime = command.DateTime
            });
            _context.SaveChanges();
        }
    }
}
