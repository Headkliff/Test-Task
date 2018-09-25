using System;
using System.Collections.Generic;

namespace DemoApp.Data.Models.Models
{
    public class Post
    {
        public Guid PostId { get; set; }

        public int Index { get; set; }

        public string Title { get; set; }

        public DateTime DateTime { get; set; }

        public ICollection<Comment> Comments { get; set; }
    }
}
