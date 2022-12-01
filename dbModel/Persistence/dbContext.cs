using Microsoft.EntityFrameworkCore;
using my_new_app.dbModel.Domain;
using my_new_app.dbModel.Persistence.Configuration;

namespace my_new_app.dbModel.Persistence
{
    public class dbContext : DbContext
    {

    protected readonly IConfiguration Configuration;

    public dbContext(IConfiguration configuration)
    {
        Configuration = configuration;
        // Database.SetInitializer(new DropCreateDatabaseAlways<dbContext> ());  

    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to sqlite database
        options.UseSqlServer(Configuration.GetConnectionString("dbContext"));
    }



        // private static readonly SetRetrievedInterceptor _setRetrievedInterceptor = new();
        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //     => optionsBuilder
        //      .AddInterceptors(_setRetrievedInterceptor)
        //      .UseSqlite("Data Source = customers.db");

    // public dbContext(DbContextOptions<dbContext> options): base(); 
    // {
    // }


        // public dbContext() : base("dbConnection")
        // {
        //     Database.SetInitializer(new MigrateDatabaseToLatestVersion<dbContext, Migrations.Configuration>());  //(new AttendanceDBInitializer());
        // }

        
        public DbSet<User>? User { get; set; }

    }
}
