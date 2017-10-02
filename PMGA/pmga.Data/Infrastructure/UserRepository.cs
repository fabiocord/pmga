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
    public class UserRepository : IUserRepository
    {
        public PmgaDbContext context { get; }
        public UserRepository(PmgaDbContext context)
        {
            this.context = context;
        }
        public async Task<User> GetUser(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Users.FindAsync(id); 
            else
                return await context.Users
                .Include(u => u.Permissions)
                    .ThenInclude(up => up.Permission)
                .Include(u => u.Roles)
                    .ThenInclude(ur => ur.Role)
                        .ThenInclude(rp => rp.Permissions)
                            .ThenInclude(p => p.Permission)
                .SingleOrDefaultAsync(u => u.Id == id);
        }

        public async Task<QueryResult<User>> GetUsers(UserQuery queryObj)
        {
            var result = new QueryResult<User>();
            var query =  context.Users.AsQueryable();

            if (queryObj.Nome != "" && queryObj.Nome != null)    
                query = query.Where(u => u.Nome.Contains(queryObj.Nome));  
            if (queryObj.Email != "" && queryObj.Email != null)    
                query = query.Where(u => u.Email.ToString() == queryObj.Email.ToString());            
            if (queryObj.Documento != "" && queryObj.Documento != null)     
                query = query.Where(u => u.Documento.ToString() == queryObj.Documento.ToString());      
            if (queryObj.Telefone1 != "" && queryObj.Telefone1 != null)    
                query = query.Where(u => u.Telefone1.ToString().Contains(queryObj.Telefone1.ToString()) || u.Telefone2.ToString().Contains(queryObj.Telefone1.ToString()));
            if (queryObj.Telefone2 != "" && queryObj.Telefone2 != null)    
                query = query.Where(u => u.Telefone1.ToString().Contains(queryObj.Telefone2.ToString()) || u.Telefone2.ToString().Contains(queryObj.Telefone2.ToString()));
            if (queryObj.UF != "" && queryObj.UF != null)    
                query = query.Where(u => u.UF.Contains(queryObj.UF));          
            if (queryObj.Cidade != "" && queryObj.Cidade != null)    
                query = query.Where(u => u.Cidade.Contains(queryObj.Cidade));
            if (queryObj.ConfirmEmail.HasValue)    
                query = query.Where(u => u.ConfirmEmail == Convert.ToBoolean(queryObj.ConfirmEmail));
            if (queryObj.Active.HasValue)    
                query = query.Where(u => u.Active == Convert.ToBoolean(queryObj.Active));
            
            var columnsMap = new Dictionary<string,Expression<Func<User,object>>>()
            {
                ["nome"] = u => u.Nome,
                ["email"] = u => u.Email,               
                ["documento"] = u => u.Documento, 
                ["telefone1"] = u => u.Telefone1, 
                ["telefone2"] = u => u.Telefone2, 
                ["uf"] = u => u.UF, 
                ["cidade"] = u => u.Cidade,               
                ["active"] = u => u.Active                
            };

            query = query.ApplyOrdering(queryObj, columnsMap);
            result.TotalItems = await query.CountAsync();
            query = query.ApplyPaging(queryObj);
            result.Items = await query.ToListAsync();
            return result;
        }
        public void Add(User user)
        {
            context.Users.Add(user);
        }
        public void Remove(User user)
        {
            context.Users.Remove(user);
        }
    }
}