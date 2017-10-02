using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using pmga.Controllers.Resources;
using pmga.Controllers.Resources.Authentication;
using pmga.Controllers.Resources.Authentication.Saves;
using pmga.Controllers.Resources.Authentication.Querys;
using pmga.Core;
using pmga.Core.Domain;
using pmga.Core.Domain.Authentication;
using pmga.Core.Domain.Authentication.Querys;
using System;

namespace spmga.Controllers
{
    [Route("/api/admin/roles")]
    public class RolesController : Controller
    {      
        public IMapper mapper { get; }
        public IUnitOfWork unitOfWork { get; }
        public IRoleRepository repository { get;set; }
        
        public RolesController(IMapper mapper, IRoleRepository repository, IUnitOfWork unitOfWork)
        {            
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRole([FromBody] SaveRoleResource roleResource)
        {            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var role = mapper.Map<SaveRoleResource, Role>(roleResource);
            repository.Add(role);           
            await unitOfWork.CompleteAsync();
            role = await repository.GetRole(role.Id);
            var result = mapper.Map<Role, RoleResource>(role);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRole(int id, [FromBody] SaveRoleResource roleResource)
        {             
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var role = await repository.GetRole(id);

            if (role == null)
                return NotFound();

            mapper.Map<SaveRoleResource, Role>(roleResource, role);
            await unitOfWork.CompleteAsync();

            role = await repository.GetRole(role.Id);
            var result = mapper.Map<Role, RoleResource>(role);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            
            var role = await repository.GetRole(id);            
            if (role == null)
                return NotFound();
            
            repository.Remove(role);
            
            await unitOfWork.CompleteAsync();
            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRole(int id)
        {
            var role = await repository.GetRole(id);            
            if (role == null)
                return NotFound();

            var roleResource = mapper.Map<Role, RoleResource>(role);
            return Ok(roleResource);
        }

        [HttpGet]
        public async Task<QueryResultResource<RoleResource>> GetRoles(RoleQueryResource filterResource)
        {
            var filter = mapper.Map<RoleQueryResource,RoleQuery>(filterResource);
            var queryResult = await repository.GetRoles(filter);
            return mapper.Map<QueryResult<Role>, QueryResultResource<RoleResource>>(queryResult);           
        }
    }    
}