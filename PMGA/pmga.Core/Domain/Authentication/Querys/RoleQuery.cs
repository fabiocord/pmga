using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace pmga.Core.Domain.Authentication.Querys
{
    public class RoleQuery : AuthBaseQuery
    {
        public string Nome { get; set; }         
        public string Description { get; set; }
        public int? Active { get; set; }        
        // public ICollection<RolePermission> Permissions {get; set;}

        // public RoleQuery()
        // {
        //     Permissions = new Collection<RolePermission>();            
        // }
        
    }
}