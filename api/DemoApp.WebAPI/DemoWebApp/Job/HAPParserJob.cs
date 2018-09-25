using System;
using System.Threading.Tasks;
using Autofac;
using DemoApp.Core.Services;
using DemoApp.Shared.CQRS.Commands;
using DemoApp.Shared.CQRS.Interfaces.Commands;
using Quartz;

namespace DemoWebApp.Job
{
    public class HapParserJob : IParserJob
    {
        private readonly IParser _parser;
        private readonly ICommandDispatcher _commandDispatcher;

        public HapParserJob(ICommandDispatcher commandDispatcher)
        {
            _commandDispatcher = commandDispatcher;
            _parser = AutofacConfig.Container.ResolveNamed<IParser>("Hap"); ;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            try
            {
                var dataToInsert = _parser.Parse();

                foreach (var i in dataToInsert)
                {
                    var command = new CreatePostCommand(Guid.NewGuid(), i.Index, i.Title, i.DateTime);
                    _commandDispatcher.Execute(command);
                }
            }

            catch (Exception)
            {
                //insert log here
            }

        }
    }
    
}