using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;
using Abp.Domain.Uow;
using DemoApp.Data.Models.Models;

namespace DemoApp.Data.Implementation
{
    public class DataBaseContext : DbContext, IUnitOfWork
    {
        public DataBaseContext() : base("name=DefaultConnection")
        {

        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        private DbContextTransaction transaction;
        private IUnitOfWork _unitOfWorkImplementation;
        private IUnitOfWork _unitOfWorkImplementation1;

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>().HasMany(model => model.Comments).WithOptional(comment => comment.Post);
        }

        public void BeginTransaction()
        {
            transaction = base.Database.BeginTransaction();
        }

        public int Commit()
        {
            this.SaveChanges();
            transaction.Commit();
            return 0;
        }

        public void RollBack()
        {
            transaction.Rollback();
        }

        public void SaveChanges()
        {
            _unitOfWorkImplementation1.SaveChanges();
        }

        public Task SaveChangesAsync()
        {
            return _unitOfWorkImplementation1.SaveChangesAsync();
        }

        public IDisposable DisableFilter(params string[] filterNames)
        {
            return _unitOfWorkImplementation1.DisableFilter(filterNames);
        }

        public IDisposable EnableFilter(params string[] filterNames)
        {
            return _unitOfWorkImplementation1.EnableFilter(filterNames);
        }

        public bool IsFilterEnabled(string filterName)
        {
            return _unitOfWorkImplementation1.IsFilterEnabled(filterName);
        }

        public IDisposable SetFilterParameter(string filterName, string parameterName, object value)
        {
            return _unitOfWorkImplementation1.SetFilterParameter(filterName, parameterName, value);
        }

        public IDisposable SetTenantId(int? tenantId)
        {
            return _unitOfWorkImplementation1.SetTenantId(tenantId);
        }

        public IDisposable SetTenantId(int? tenantId, bool switchMustHaveTenantEnableDisable)
        {
            return _unitOfWorkImplementation1.SetTenantId(tenantId, switchMustHaveTenantEnableDisable);
        }

        public int? GetTenantId()
        {
            return _unitOfWorkImplementation1.GetTenantId();
        }

        public UnitOfWorkOptions Options => _unitOfWorkImplementation1.Options;

        public IReadOnlyList<DataFilterConfiguration> Filters => _unitOfWorkImplementation1.Filters;

        public bool IsDisposed => _unitOfWorkImplementation1.IsDisposed;

        public event EventHandler Completed
        {
            add => _unitOfWorkImplementation1.Completed += value;
            remove => _unitOfWorkImplementation1.Completed -= value;
        }

        public event EventHandler<UnitOfWorkFailedEventArgs> Failed
        {
            add => _unitOfWorkImplementation1.Failed += value;
            remove => _unitOfWorkImplementation1.Failed -= value;
        }

        public event EventHandler Disposed
        {
            add => _unitOfWorkImplementation1.Disposed += value;
            remove => _unitOfWorkImplementation1.Disposed -= value;
        }

        public void Complete()
        {
            _unitOfWorkImplementation1.Complete();
        }

        public Task CompleteAsync()
        {
            return _unitOfWorkImplementation1.CompleteAsync();
        }

        public void Begin(UnitOfWorkOptions options)
        {
            _unitOfWorkImplementation1.Begin(options);
        }

        public string Id => _unitOfWorkImplementation1.Id;

        public IUnitOfWork Outer
        {
            get => _unitOfWorkImplementation1.Outer;
            set => _unitOfWorkImplementation1.Outer = value;
        }
    }
}
