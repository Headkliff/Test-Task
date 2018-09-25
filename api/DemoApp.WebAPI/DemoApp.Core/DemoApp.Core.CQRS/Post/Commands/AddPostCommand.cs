using DemoApp.Shared.CQRS.Interfaces.Commands;

namespace DemoApp.Core.CQRS.Post.Commands
{
    public class AddPostCommand : ICommand<long>
    {
        public string Title { get; set; }

        public string Content { get; set; }
    }
}
