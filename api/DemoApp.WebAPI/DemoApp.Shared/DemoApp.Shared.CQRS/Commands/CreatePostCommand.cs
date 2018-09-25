using System;
using DemoApp.Shared.CQRS.Interfaces.Commands;

namespace DemoApp.Shared.CQRS.Commands
{
    public class CreatePostCommand:ICommand
    {
        public Guid PostId { get; }

        public int Index { get; }

        public string Title { get; }

        public DateTime DateTime { get; } 

        public CreatePostCommand(Guid id,int index, string title,DateTime dataTime)
        {
            PostId = id;
            Index = index;
            Title = title;
            DateTime = dataTime;
        }
    }
}
