using System;
using DemoApp.Data.Models.Models;
using DemoApp.Shared.CQRS.Interfaces.Commands;

namespace DemoApp.Shared.CQRS.Commands
{
    class CreateCommentCommand: ICommand
    {
        public Guid CommentId { get; }

        public string UserName { get; }

        public string Text { get; }

        public Post Post { get; }

        public CreateCommentCommand(Guid id, string user, string text, Post post)
        {
            CommentId = id;
            UserName = user;
            Text = text;
            Post = post;
        }
    }
}
