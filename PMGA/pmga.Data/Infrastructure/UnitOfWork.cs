using System;
using System.Threading.Tasks;
using pmga.Core;
using pmga.Data.Infrastructure.Data;

namespace pmga.Data.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly PmgaDbContext context;
        public UnitOfWork(PmgaDbContext context)
        {
            this.context = context;
        }
        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}