using Microsoft.AspNetCore.Mvc;
using my_new_app.dbModel.Application.IDataServices;
using my_new_app.dbModel.Domain;
namespace my_new_app.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController :  ControllerBase   //BaseApiController<User>
{

    private readonly ICrudEntityService<User> userSerivce;

    public UserController(ICrudEntityService<User> UserSerivce)  //:base(UserSerivce)
    {
        this.userSerivce = UserSerivce;
    }

    [HttpGet]
    [Route("get"), ActionName("get")]
    public IEnumerable<User> Get()
    {
        try
        {
            var result = userSerivce.Get(null, null, null);
            return result;
        }
        catch (Exception ex)
        {
            ModelState.AddModelError("key", ex.Message);
            var ee = BadRequest(ModelState);
            //throw ex;
            var list = new List<User>();
            return list.AsEnumerable() ;
        }
    }

    [HttpPost]
    //[Route("post"), ActionName("post")]
    public bool Post([FromBody] User model)
    {
        try
        {
            if (ModelState.IsValid)
            {
                var result = userSerivce.CreateEntity(model);
                return result;
            }
            return false;
        }
        catch (Exception ex)
        {
            var innerException = ex;
            this.ModelState.AddModelError("key", innerException.Message);
            var ee = BadRequest(ModelState);
            //throw ex ;
            return false;
        }
    }

    [HttpGet]
    [Route("get/{id}"), ActionName("get")]
    public User get(int id)
    {
        try
        {
            var result = userSerivce.GetEntity(id);
            return result?? new User();
        }
        catch (Exception ex)
        {
            var innerException = ex;
            this.ModelState.AddModelError("key", innerException.Message);
            var ee = BadRequest(ModelState);
            //throw  ex;
            return new User();
        }
    }

        

        [HttpPut()]
        [Route("Put"), ActionName("Put")]
        public virtual bool Put([FromBody] User model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var modifyDate = model.GetType().GetProperty("ModifyDate");
                    if (modifyDate != null)
                        modifyDate.SetValue(model, DateTime.Now);

                    var result = userSerivce.UpdateEntity(model);                    
                    return result;
                }
                return false;
            }
            catch (Exception ex)
            {
                var innerException = ex;
                this.ModelState.AddModelError("key", innerException.Message);
                var ee = BadRequest(ModelState);
                //throw ex;
                return false;
            }
        }
      
        [HttpDelete]
        [Route("delete/{id}"), ActionName("delete")]
        public bool Delete(int id)
        {
            try
            {
                var result = userSerivce.DeleteEntity(id);
                return result;
            }
            catch (Exception ex)
            {
                var innerException = ex;
                this.ModelState.AddModelError("key", innerException.Message);
                var ee = BadRequest(ModelState);
                //throw ex;
                return false;
            }
        }
}
