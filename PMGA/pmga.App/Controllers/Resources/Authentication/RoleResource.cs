using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace pmga.Controllers.Resources.Authentication
{
    public class RoleResource
    {
         public int Id { get; set; }        
        public string Nome { get; set; }         
        public string Description { get; set; }
        public bool Active { get; set; }
        public DateTime CreationDate { get; set; }

        public ICollection<PermissionResource> Permissions {get; set;}

        public RoleResource()
        {
            Permissions = new Collection<PermissionResource>();
        }
    }
}