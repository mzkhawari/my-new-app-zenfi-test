using my_new_app.dbModel.Persistence;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace my_new_app.dbModel.Persistence.Repository
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        internal dbContext context;
        DbSet<TEntity> dbSet;
        public Repository(dbContext contextApp)
        {
            this.context = contextApp;
            this.dbSet = context.Set<TEntity>();
        }
        public virtual IEnumerable<TEntity> Get(Expression<Func<TEntity, bool>>? filter = null, Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null, string? includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;
            if (filter != null)
            {
                query = query.Where(filter).AsNoTracking();
            }
            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties.Split
                    (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty);
                }
            }
            if (orderBy != null)
            {
                return orderBy(query).AsNoTracking().AsEnumerable();
            }
            else
            {
                return query.AsNoTracking().AsEnumerable();
            }
        }

        public TEntity? GetEntity(Expression<Func<TEntity, bool>>? filter = null, string? includeProperties = "")
        {
            IQueryable<TEntity> query = dbSet;
            if (filter != null)
            {
                query = query.Where(filter).AsNoTracking();
            }
            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties.Split
                    (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty);
                }
            }
            return query.AsEnumerable().FirstOrDefault();
        }

        public TEntity? GetEntity(int id)
        {
            return dbSet.Find(id);
        }

        public void CreateEntity(TEntity model)
        {
            dbSet.Add(model);
        }
        public void UpdateEntity(TEntity model)
        {
            dbSet.Attach(model);
            context.Entry(model).State = EntityState.Modified;
        }

        public void DeleteEntity(int id)
        {
            var model = dbSet.Find(id);
            if(model!=null){
            dbSet.Remove(model);
            }
        }

    }
}
