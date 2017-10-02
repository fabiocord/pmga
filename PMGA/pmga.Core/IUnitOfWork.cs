using System.Threading.Tasks;

namespace pmga.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }   
}