using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace my_new_app.dbModel.Persistence.Repository;

    public interface IUnitOfWork<TEntity> where TEntity : class
    {
        IRepository<TEntity> Repository { get; }

        /// <summary>
        /// Commits all changes
        /// </summary>
        bool Save();
        /// <summary>
        /// Discards all changes that has not been commited
        /// </summary>
        void RejectChanges();
        void Dispose();
    }

