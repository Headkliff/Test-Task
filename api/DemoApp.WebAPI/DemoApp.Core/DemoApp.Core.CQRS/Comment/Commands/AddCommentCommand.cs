using DemoApp.Shared.CQRS.Interfaces.Commands;

namespace DemoApp.Core.CQRS.Comment.Commands
{
    public class AddCommentCommand : ICommand<long>
    {
        public int PostId { get; set; }

        public string UserName { get; set; }

        public string Text { get; set; }
    }
}
