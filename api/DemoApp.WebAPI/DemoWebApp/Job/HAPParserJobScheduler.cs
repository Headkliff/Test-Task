using Autofac;
using Quartz;

namespace DemoWebApp.Job
{
    public class HapParserJobScheduler
    {
        public async void Start()
        {
            IScheduler sched = AutofacConfig.Container.Resolve<IScheduler>();
            sched.JobFactory = new AutofacParserJobFactory(AutofacConfig.Container);

            await sched.Start();
            IJobDetail job = JobBuilder.Create<HapParserJob>()
                .WithIdentity("Hap", "admin")
                .Build();

            ITrigger trigger = TriggerBuilder.Create()
                .WithIdentity("Hap", "admin")
                .WithSimpleSchedule(x => x
                    .RepeatForever()
                    .WithIntervalInMinutes(15)
                )
                .StartNow()
                .Build();

            await sched.ScheduleJob(job, trigger);
        }
    }
}