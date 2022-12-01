using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace my_new_app.dbModel.Application.IDataServices;
    public interface ICrudEntityService<T>  where  T :class
    {
        IEnumerable<T> Get(Expression<Func<T, bool>>? filter, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy, string? includeProperties);
        T? GetEntity(int id);
        bool CreateEntity(T model);
        bool UpdateEntity(T model);
        bool DeleteEntity(int id);
    }
