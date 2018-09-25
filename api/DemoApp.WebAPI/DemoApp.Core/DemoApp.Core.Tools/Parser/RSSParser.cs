using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Xml.Linq;
using DemoApp.Core.Services;
using DemoApp.Data.Models.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DemoApp.Core.Tools.Parser
{
    public class RssParser:IParser
    {
        private const string CONTENT = "//app_data/AFINN-ru.json";
        JsonTextReader reader = new JsonTextReader(new StringReader(CONTENT));

        public List<Post> Parse()
        {
            List<Post> dataList = new List<Post>();

            const string URL = "https://news.tut.by/rss/index.rss";

            try
            {
                var xDoc = XDocument.Load(URL);
                var items = (from x in xDoc.Descendants("item")select new{title = x.Element("title")?.Value});

                dataList.AddRange(items.Select(i => new Post
                {
                    Title = i.title,
                    Index = Index(i.title),
                    DateTime = DateTime.Now,
                }));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

            return dataList;
        }

        public int Index(string title)
        {
            HttpClient client = new HttpClient();

            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));//ACCEPT header

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "http://api.ispras.ru/texterra/v1/nlp?targetType=lemma&apikey=a5cd324bb2377af9c2f0a948a3d0e32dc276f83e")
            {
                Content = new StringContent("[{\"text\":\""+title+"\"}]", Encoding.UTF8, "application/json")//CONTENT-TYPE header
            };
            HttpResponseMessage x = client.SendAsync(request).Result;

            string[] s = { };
            s = x.Content.ReadAsStringAsync().Result.Split(new char[] {' '},StringSplitOptions.RemoveEmptyEntries);

            int value = 0;
            foreach (var item in s)
            {
                while (reader.Read())
                {
                    if (reader.TokenType.Equals(item))
                    {
                        value = +Convert.ToInt32(reader.Value);
                    }
                }
            }

            return value;
        }
    }
}
