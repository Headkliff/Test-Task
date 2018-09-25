using System.Collections.Generic;
using DemoApp.Data.Models.Models;

namespace DemoApp.Core.Services
{
    public interface IParser
    {
        List<Post> Parse();
    }
}