using System.Threading.Tasks;
using pmga.Core.Domain;
using pmga.Core.Domain.Authentication;
using pmga.Core.Domain.Authentication.Querys;

namespace pmga.Core
{
    public interface IUserRepository
    {
        Task<User> GetUser(int id, bool includeRelated = true);
        void Add(User user);
        void Remove(User user);
        Task<QueryResult<User>> GetUsers(UserQuery queryObj);
    }
}