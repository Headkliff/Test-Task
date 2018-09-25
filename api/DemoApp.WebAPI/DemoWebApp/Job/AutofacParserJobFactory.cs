﻿using Autofac;
using Quartz;
using Quartz.Spi;

namespace DemoWebApp.Job
{
    public class AutofacParserJobFactory : IJobFactory
    {
        private readonly IContainer _container;

        public AutofacParserJobFactory(IContainer container)
        {
            _container = container;
        }

        public IJob NewJob(TriggerFiredBundle bundle, IScheduler scheduler)
        {
            return (IJob)_container.Resolve(bundle.JobDetail.JobType);
        }

        public void ReturnJob(IJob job)
        {
        }
    }
}