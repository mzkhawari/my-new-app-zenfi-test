using Microsoft.EntityFrameworkCore;
using my_new_app.dbModel.Application.IDataServices;
using my_new_app.dbModel.Domain;
using my_new_app.dbModel.Persistence;
using my_new_app.dbModel.Persistence.DataServices;
using my_new_app.dbModel.Persistence.Repository;

var builder = WebApplication.CreateBuilder(args);


var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.AllowAnyOrigin()
                                             .AllowAnyHeader()
                                             .AllowAnyOrigin()
                                             .AllowAnyMethod();
                      });
});

 builder.Services.AddControllersWithViews();
 builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
 builder.Services.AddScoped(typeof(IUnitOfWork<>), typeof(UnitOfWork<>));
 builder.Services.AddScoped<IUnitOfWork<User>, UnitOfWork<User>>();
 builder.Services.AddScoped<UnitOfWork<User>>();
 builder.Services.AddScoped(typeof(ICrudEntityService<>), typeof(CrudEntityService<>));
 builder.Services.AddScoped<ICrudEntityService<User>, CrudEntityService<User>>();
 var connectionString = builder.Configuration.GetConnectionString("dbContext");
 builder.Services.AddDbContext<dbContext>(options =>
    options.UseSqlServer(connectionString)); 


var app = builder.Build();



// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    //app.UseHsts();
}

//app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
