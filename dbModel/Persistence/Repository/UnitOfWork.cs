
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace my_new_app.dbModel.Persistence.Repository
{
    public class UnitOfWork<TEntity> : IUnitOfWork<TEntity>, IDisposable where TEntity : class
    {
        private readonly dbContext _dbContext;
        #region Repositories        
        public IRepository<TEntity> Repository => new Repository<TEntity>(_dbContext);
        #endregion
        public UnitOfWork(dbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public bool Save()
        {
            var result = _dbContext.SaveChanges();

            if (result > 0)
                return true;
            return false;
        }
        public void Dispose()
        {
            _dbContext.Dispose();
        }
        public void RejectChanges()
        {
        }
    }
}