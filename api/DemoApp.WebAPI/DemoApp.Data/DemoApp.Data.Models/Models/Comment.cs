using System;

namespace DemoApp.Data.Models.Models
{
    public class Comment
    {
        public Guid CommentId { get; set; }

        public string UserName { get; set; }

        public string Text { get; set; }

        public Post Post { get; set; }
    }
}
