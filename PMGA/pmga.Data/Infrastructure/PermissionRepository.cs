using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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
    public class PermissionRepository : IPermissionRepository
    {
        public PmgaDbContext context { get; }
        public PermissionRepository(PmgaDbContext context)
        {
            this.context = context;
        }

        public async Task<Permission> GetPermission(int id)
        {
           return await context.Permissions.FindAsync(id);
        }

        public async Task<QueryResult<Permission>> GetPermissions(PermissionQuery queryObj)
        {
            var result = new QueryResult<Permission>();
            var query =  context.Permissions.AsQueryable();

            if (queryObj.Nome != "" && queryObj.Nome != null)    
                query = query.Where(c => c.Nome.Contains(queryObj.Nome));   
            if (queryObj.Description != "" && queryObj.Description != null)    
                query = query.Where(c => c.Description.Contains(queryObj.Description));       
            if (queryObj.Path != "" && queryObj.Path != null)    
                query = query.Where(c => c.Path.Contains(queryObj.Path));
            if (queryObj.Active.HasValue)    
                query = query.Where(c => c.Active == Convert.ToBoolean(queryObj.Active));
            if (queryObj.ParentId.HasValue)
                query = query.Where(c => c.ParentId == queryObj.ParentId);

            var columnsMap = new Dictionary<string,Expression<Func<Permission,object>>>()
            {
                ["nome"] = p => p.Nome,
                ["description"] = p => p.Description,
                ["path"] = p => p.Path,
                ["active"] = p => p.Active                
            };

            query = query.ApplyOrdering(queryObj, columnsMap);
            result.TotalItems = await query.CountAsync();
            query = query.ApplyPaging(queryObj);
            result.Items = await query.ToListAsync();
            return result;
        }

        public void Add(Permission permission)
        {
           context.Permissions.Add(permission);
        }        

        public void Remove(Permission permission)
        {
            context.Permissions.Remove(permission);
        }

        public async Task<List<PermissionTree>> GetPermissionsChilds()//PermissionQuery queryObj
        {
           // IEnumerable<PermissionTree> permissionChilds;
            //var result = new IQueryable<PermissionTree>();   

            var lookup = context.Permissions.ToLookup(x => x.ParentId);

            Func<int?, List<PermissionTree>> build = null;
            build = pid =>
                lookup[pid]
                .Select( x => new PermissionTree()
                {
                    Label = x.Nome,
                    Data =  x,
                    ExpandedIcon = "fa-folder-open",
                    CollapsedIcon = "fa-folder",                    
                    Children = build(x.Id),

                }).ToList();
            List<PermissionTree> trees = build(null);



            // var queryResult = (from p in context.Permissions                                                          
            // select new PermissionTree{Id = p.Id,
            // Nome = p.Nome,
            // Active = p.Active,
            // CreationDate = p.CreationDate,
            // Description = p.Description,
            // Path = p.Path,
            // PermissionTrees = new Collection<int>((from pc in context.Permissions
            // where p.Id == pc.ParentId 
            // select pc.Id).ToList())
            // });
 //           var result=  from p in trees
   //         select new PermissionTree { Id = p.Id, Nome = p.Nome, Active = p.Active, CreationDate = p.CreationDate, Description = p.Description, Path = p.Path, Children = p.Children };          
             
            return await Task.Run(() => trees);
        }
    }
}