using Autofac;
using Quartz;

namespace DemoWebApp.Job
{
    public class RssParserJobScheduler
    {
        public async void Start()
        {
            IScheduler sched = AutofacConfig.Container.Resolve<IScheduler>();
            sched.JobFactory = new AutofacParserJobFactory(AutofacConfig.Container);
            await sched.Start();
            IJobDetail job = JobBuilder.Create<RssParserJob>()
                .WithIdentity("RSS", "admin")
                .Build();

            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity("RSS", "admin")
                .WithSimpleSchedule(x => x
                    .RepeatForever()
                    .WithIntervalInMinutes(5)
                )
                .StartNow()
                .Build();

            await sched.ScheduleJob(job, trigger);
        }
    }
}