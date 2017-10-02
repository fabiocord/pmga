using System.Threading.Tasks;
using pmga.Core.Domain;
using pmga.Core.Domain.Authentication;
using pmga.Core.Domain.Authentication.Querys;

namespace pmga.Core
{
    public interface IRoleRepository
    {
        Task<Role> GetRole(int id, bool includeRelated = true);
        void Add(Role role);
        void Remove(Role role);
        Task<QueryResult<Role>> GetRoles(RoleQuery queryObj);
    }
}