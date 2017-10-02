using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using pmga.Controllers.Resources;
using pmga.Controllers.Resources.Authentication;
using pmga.Controllers.Resources.Authentication.Querys;
using pmga.Controllers.Resources.Authentication.Saves;
using pmga.Core;
using pmga.Core.Domain;
using pmga.Core.Domain.Authentication;
using pmga.Core.Domain.Authentication.Querys;

namespace pmga.Controllers
{
    [Route("/api/admin/users")]
    public class UsersController : Controller
    {
        public IMapper mapper { get; }
        public IUserRepository repository { get; }
        public IUnitOfWork unitOfWork { get; }
         public UsersController(IMapper mapper, IUserRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] SaveUserResource userResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = mapper.Map<SaveUserResource,User>(userResource);
            repository.Add(user);
            await unitOfWork.CompleteAsync();
            user = await repository.GetUser(user.Id);
            var result = mapper.Map<User, UserResource>(user);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] SaveUserResource userResource)
        {             
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var user = await repository.GetUser(id);

            if (user == null)
                return NotFound();

            mapper.Map<SaveUserResource, User>(userResource, user);
            await unitOfWork.CompleteAsync();

            user = await repository.GetUser(user.Id);
            var result = mapper.Map<User, UserResource>(user);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await repository.GetUser(id);
            if (user == null)
                return NotFound();
            repository.Remove(user);
            await unitOfWork.CompleteAsync();
            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await repository.GetUser(id);

            if (user == null)
                return NotFound();

            var UserResource = mapper.Map<User, UserResource>(user);
            return Ok(UserResource);
        }

        [HttpGet]
        public async Task<QueryResultResource<UserResource>> GetUsers(UserQueryResource filterResource)
        {
            var filter = mapper.Map<UserQueryResource,UserQuery>(filterResource);
            var queryResult = await repository.GetUsers(filter);
            return mapper.Map<QueryResult<User>, QueryResultResource<UserResource>>(queryResult);
        }

        
    }
}