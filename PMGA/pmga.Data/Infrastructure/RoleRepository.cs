using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using pmga.Core;
using pmga.Core.Domain;
using pmga.Core.Domain.Authentication;
using pmga.Core.Domain.Authentication.Querys;
using pmga.Core.Extensions;
using pmga.Data.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace pmga.Data.Infrastructure
{
    public class RoleRepository : IRoleRepository
    {
        public PmgaDbContext context { get; }
        public RoleRepository(PmgaDbContext context)
        {
            this.context = context;
        }

        public async Task<Role> GetRole(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Roles.FindAsync(id);
            else
                return await context.Roles
                .Include(r => r.Permissions)
                    .ThenInclude(rp => rp.Permission)
                .SingleOrDefaultAsync(r => r.Id == id);           
        }

        public async Task<QueryResult<Role>> GetRoles(RoleQuery queryObj)
        {
            var result = new QueryResult<Role>();
            var query =  context.Roles
            .Include(r => r.Permissions)
                    .ThenInclude(rp => rp.Permission)
            .AsQueryable();        
            

            if (queryObj.Nome != "" && queryObj.Nome != null)    
                query = query.Where(c => c.Nome.Contains(queryObj.Nome));   
            if (queryObj.Description != "" && queryObj.Description != null)    
                query = query.Where(c => c.Description.Contains(queryObj.Description));                   
            if (queryObj.Active.HasValue)    
                query = query.Where(c => c.Active == Convert.ToBoolean(queryObj.Active));
            
            var columnsMap = new Dictionary<string,Expression<Func<Role,object>>>()
            {
                ["nome"] = p => p.Nome,
                ["description"] = p => p.Description,                
                ["active"] = p => p.Active                
            };

            query = query.ApplyOrdering(queryObj, columnsMap);
            result.TotalItems = await query.CountAsync();
            query = query.ApplyPaging(queryObj);
            result.Items = await query.ToListAsync();
            return result;
        }

        public void Add(Role role)
        {
             context.Roles.Add(role);
        }

        public void Remove(Role role)
        {
            context.Roles.Remove(role);
        }
    }
}