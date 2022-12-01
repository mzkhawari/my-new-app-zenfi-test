using System.Linq.Expressions;
using my_new_app.dbModel.Persistence.Repository;
using my_new_app.dbModel.Application.IDataServices;
using Microsoft.EntityFrameworkCore;

namespace my_new_app.dbModel.Persistence.DataServices
{
    public class CrudEntityService<T> : ICrudEntityService<T> where T : class
    {
        private UnitOfWork<T> UnitOfWork;
        public CrudEntityService(UnitOfWork<T> unitwork)
        {
            UnitOfWork = unitwork;
        }

        public bool CreateEntity(T model)
        {
            UnitOfWork.Repository.CreateEntity(model);
            var result  = UnitOfWork.Save();
            return result;
        }
        
        public bool DeleteEntity(int id)
        {
            UnitOfWork.Repository.DeleteEntity(id);
            return UnitOfWork.Save();
        }

        public T? GetEntity(int id)
        {
            return UnitOfWork.Repository.GetEntity(id);
        }

        public bool UpdateEntity(T model)
        {
            UnitOfWork.Repository.UpdateEntity(model);
            var result = UnitOfWork.Save();
            return result;
        }

        public IEnumerable<T> Get(Expression<Func<T, bool>>? filter = null, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, string? includeProperties = "")
        {
            var result = UnitOfWork.Repository.Get(filter, orderBy, includeProperties).AsQueryable().AsNoTracking();
            return result;
        }

    }
}
