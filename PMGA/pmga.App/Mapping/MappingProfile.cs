using System.Linq;
using AutoMapper;
using pmga.Controllers.Resources.Authentication;
using pmga.Controllers.Resources.Authentication.Querys;
using pmga.Controllers.Resources.Authentication.Saves;
using pmga.Core.Domain.Authentication;
using pmga.Core.Domain.Authentication.Querys;
using pmga.Core.Domain;
using pmga.Controllers.Resources;

namespace pmga.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            // Domain to API
                CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));    
            
            // Authentication            
                // Querys
                    CreateMap<PermissionTree,PermissionTreeResource>();
                    CreateMap<PermissionQuery,PermissionQueryResource>(); 
                    CreateMap<RoleQuery,RoleQueryResource>();
                    CreateMap<UserQuery,UserQueryResource>();
            
                //Models
                   
                    CreateMap<Permission,PermissionResource>();                    

                    CreateMap<Role,RoleResource>()
                    .ForMember(rr => rr.Permissions, opt => opt.MapFrom(r => r.Permissions.Select(
                        rp => new PermissionResource{
                            Id = rp.Permission.Id,
                            Nome = rp.Permission.Nome,
                            Description = rp.Permission.Description,
                            ParentId = rp.Permission.ParentId,
                            Path = rp.Permission.Path,
                            CreationDate = rp.Permission.CreationDate,                            
                            Active = rp.Permission.Active})));
                   
                    CreateMap<User,UserResource>()
                    .ForMember(ur => ur.Role, opt => opt.MapFrom(u => u.Role))
                    .ForMember(ur => ur.Permissions, opt => opt.MapFrom(u => u.Permissions.Select(up => new PermissionResource{Id = up.Permission.Id,Nome = up.Permission.Nome,Description = up.Permission.Description,ParentId = up.Permission.ParentId,Path = up.Permission.Path,CreationDate = up.Permission.CreationDate,Active = up.Permission.Active})));
                    
                //Saves
                    CreateMap<Permission,SavePermissionResource>();
                    CreateMap<Role,SaveRoleResource>()
                    .ForMember(rr => rr.Permissions,opt => opt.MapFrom(r => r.Permissions.Select(rp => rp.PermissionId)));
                    CreateMap<User,SaveUserResource>()                    
                    .ForMember(ur => ur.Permissions,opt => opt.MapFrom(u => u.Permissions.Select(up => up.PermissionId)));                    


        //API Resource to Domain

            // Authentication            
                
                // Querys                
                    CreateMap<PermissionQueryResource,PermissionQuery>(); 
                    CreateMap<RoleQueryResource,RoleQuery>();
                    CreateMap<UserQueryResource,UserQuery>();
                            
                //Saves
                    CreateMap<SavePermissionResource,Permission>()
                    .ForMember(p => p.Id,opt => opt.Ignore());
                    CreateMap<SaveRoleResource,Role>()
                    .ForMember(r => r.Id,opt => opt.Ignore())
                    .ForMember(r => r.Permissions,opt => opt.Ignore())
                    .AfterMap((rr,r) => {
                        var removedPermissions = r.Permissions.Where(p => !rr.Permissions.Contains(p.PermissionId)).ToList();
                        foreach(var p in removedPermissions)
                            r.Permissions.Remove(p);
                        var addedPermissions = rr.Permissions.Where(id => !r.Permissions.Any(p => p.PermissionId == id)).Select(id => new RolePermission {PermissionId = id}).ToList();
                        foreach(var p in addedPermissions)
                            r.Permissions.Add(p);
                    });            
                    CreateMap<SaveUserResource,User>()
                    .ForMember(u => u.Id,opt => opt.Ignore())
                    .ForMember(u => u.Permissions,opt => opt.Ignore())
                    .AfterMap((ur,u) => {
                        var removedPermissions = u.Permissions.Where(p => !ur.Permissions.Contains(p.PermissionId)).ToList();
                        foreach(var p in removedPermissions)
                            u.Permissions.Remove(p);
                        var addedPermissions = ur.Permissions.Where(id => !u.Permissions.Any(p => p.PermissionId == id)).Select(id => new UserPermission {PermissionId = id}).ToList();
                        foreach(var p in addedPermissions)
                            u.Permissions.Add(p);
                    });
 
        }
         
    }
}