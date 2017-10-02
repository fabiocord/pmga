using System.Threading.Tasks;
using pmga.Core.Domain.Authentication;
using pmga.Core.Domain;
using pmga.Core.Domain.Authentication.Querys;
using System.Collections.Generic;
using System.Linq;

namespace pmga.Core
{
    public interface IPermissionRepository
    {
        Task<Permission> GetPermission(int id);
        void Add(Permission permission);
        void Remove(Permission permission);
        Task<QueryResult<Permission>> GetPermissions(PermissionQuery queryObj);


        Task<List<PermissionTree>> GetPermissionsChilds();//PermissionQuery queryObj
    }
}