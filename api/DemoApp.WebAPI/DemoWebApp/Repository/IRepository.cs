using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoWebApp.Repository
{
    interface IRepository<T>:IDisposable
    {
        IEnumerable<T> GetList();
        T Get(int id); 
        void Create(T item); 
        void Update(T item); 
        void Delete(int id);
        void Save();
    }
}
