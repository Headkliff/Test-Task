using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using DemoApp.Data.Implementation;
using DemoApp.Data.Models.Models;

namespace DemoWebApp.Repository
{
    public class Repository:IRepository<Post>
    {
        private DataBaseContext db;
        private bool _disposed = false;

        public Repository()
        {
            db = new DataBaseContext();
        }

        public virtual void Dispose(bool disposing) 
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public IEnumerable<Post> GetList()
        {
            return db.Posts;
        }

        public Post Get(int id)
        {
            return db.Posts.Find(id);
        }

        public void Create(Post item)
        {
            db.Posts.Add(item);
        }

        public void Update(Post item)
        {
            db.Entry(item).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            Post item = db.Posts.Find(id);
            if (item != null)
                db.Posts.Remove(item);
        }

        public void Save()
        {
            db.SaveChanges();
        }
    }
}