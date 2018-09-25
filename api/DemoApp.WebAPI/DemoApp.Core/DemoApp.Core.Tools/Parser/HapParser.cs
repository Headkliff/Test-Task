using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using DemoApp.Core.Services;
using DemoApp.Data.Models.Models;
using HtmlAgilityPack;
using Newtonsoft.Json;

namespace DemoApp.Core.Tools.Parser
{
    public class HapParser : IParser
    {
        private const string CONTENT = "//app_data/AFINN-ru.json";
        readonly JsonTextReader _reader = new JsonTextReader(new StringReader(CONTENT));

        public List<Post> Parse()
        {
            const string URL = @"http://s13.ru/";
            var web = new HtmlWeb();
            var htmlDoc = web.Load(URL);
            var htmlNodes = htmlDoc.DocumentNode.SelectNodes("//div[@class='itemhead']");

            return htmlNodes.Select(node => new Post
                {
                    Title = node.SelectSingleNode("./h3/a").Name,
                    Index = Index(node.SelectSingleNode("./h3/a").Name),
                    DateTime = DateTime.Now
                })
                .ToList();
        }

        public int Index(string title)
        {
            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));//ACCEPT header

                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "http://api.ispras.ru/texterra/v1/nlp?targetType=lemma&apikey=a5cd324bb2377af9c2f0a948a3d0e32dc276f83e")
                {
                    Content = new StringContent("[{\"text\":\"" + title + "\"}]", Encoding.UTF8, "application/json")//CONTENT-TYPE header
                };
                HttpResponseMessage x = client.SendAsync(request).Result;

                string[] s = { };
                s = x.Content.ReadAsStringAsync().Result.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

                int value = 0;
                foreach (var item in s)
                {
                    while (_reader.Read())
                    {
                        if (_reader.TokenType.Equals(item))
                        {
                            value = +Convert.ToInt32(_reader.Value);
                        }
                    }
                }

                return value;
            }
        }
    }
}