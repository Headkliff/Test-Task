using DemoApp.Data.Implementation;
using DemoApp.Data.Models.Models;
using DemoApp.Shared.CQRS.Interfaces.Commands;

namespace DemoApp.Shared.CQRS.Commands
{
    class CreateCommentComandHandler: ICommandHandler<CreateCommentCommand>
    {
        private readonly DataBaseContext _context;

        public CreateCommentComandHandler(DataBaseContext c)
        {
            _context = c;
        }
        public void Execute(CreateCommentCommand command)
        {
            var comments = _context.Comments.Add(new Comment()
            {
                CommentId = command.CommentId,
                UserName = command.UserName,
                Text=command.Text,
                Post = command.Post,
            });
            _context.SaveChanges();
        }
    }
}
