using System.Data.Entity.Migrations;

namespace DemoApp.Data.Implementation.Migrations
{
    public partial class Init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        CommentId = c.Int(nullable: false, identity: true),
                        UserName = c.String(unicode: false),
                        Text = c.String(unicode: false),
                        Post_PostId = c.Int(),
                    })
                .PrimaryKey(t => t.CommentId)
                .ForeignKey("dbo.Posts", t => t.Post_PostId)
                .Index(t => t.Post_PostId);
            
            CreateTable(
                "dbo.Posts",
                c => new
                    {
                        PostId = c.Int(nullable: false, identity: true),
                        Title = c.String(unicode: false),
                        Index = c.Int(nullable: false),
                        Content = c.String(unicode: false),
                        DateTime = c.DateTime(nullable: false, precision: 0),
                    })
                .PrimaryKey(t => t.PostId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Comments", "Post_PostId", "dbo.Posts");
            DropIndex("dbo.Comments", new[] { "Post_PostId" });
            DropTable("dbo.Posts");
            DropTable("dbo.Comments");
        }
    }
}
