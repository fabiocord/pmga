using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using pmga.Controllers.Resources.Authentication;
using pmga.Controllers.Resources.Authentication.Saves;
using pmga.Core;
using pmga.Core.Domain.Authentication;
using pmga.Core.Domain.Authentication.Querys;
using System;

namespace spmga.Controllers
{
    [Route("/api/admin/permissions")]
    public class PermissionsController : Controller
    {
      
        public IMapper mapper { get; }
        public IPermissionRepository repository { get; }
        public IUnitOfWork unitOfWork { get; }
        public PermissionsController(IMapper mapper, IPermissionRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePermission([FromBody] SavePermissionResource permissionResource)
        {            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var permission = mapper.Map<SavePermissionResource, Permission>(permissionResource);
            repository.Add(permission);           
            await unitOfWork.CompleteAsync();
            permission = await repository.GetPermission(permission.Id);
            var result = mapper.Map<Permission, PermissionResource>(permission);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePermission(int id, [FromBody] SavePermissionResource permissionResource)
        {             
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var permission = await repository.GetPermission(id);

            if (permission == null)
                return NotFound();

            mapper.Map<SavePermissionResource, Permission>(permissionResource, permission);
            await unitOfWork.CompleteAsync();

            permission = await repository.GetPermission(permission.Id);
            var result = mapper.Map<Permission, PermissionResource>(permission);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePermission(int id)
        {
            
            var permission = await repository.GetPermission(id);        
            if (permission == null)
                return NotFound();

            var permissions = repository.GetPermissions(new PermissionQuery(){ ParentId = id });            
            foreach (var p in permissions.Result.Items)
            {
               repository.Remove(p);    
            }    
            repository.Remove(permission);
            
            await unitOfWork.CompleteAsync();
            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPermission(int id)
        {
            var permission = await repository.GetPermission(id);            
            if (permission == null)
                return NotFound();

            var permissionResource = mapper.Map<Permission, PermissionResource>(permission);
            return Ok(permissionResource);
        }

        [HttpGet]
        public async Task<List<PermissionTreeResource>> GetPermissions()//PermissionQueryResource filterResource
        {
           // Console.Write("Entrou na action");
            //var filter = mapper.Map<PermissionQueryResource,PermissionQuery>(null);
            var queryResult = await Task.Run(() => repository.GetPermissionsChilds());            
            return mapper.Map<List<PermissionTree>, List<PermissionTreeResource>>(queryResult);
        }
    }
}