using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace my_new_app.dbModel.Persistence.Repository;

    public interface IRepository<T> where T : class
    {
        IEnumerable<T> Get(Expression<Func<T, bool>>? filter = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, string? includeProperties = "");
        T? GetEntity(int id);
        void CreateEntity(T model);
        void UpdateEntity(T model);
        void DeleteEntity(int id);
    }
