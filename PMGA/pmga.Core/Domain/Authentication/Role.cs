using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace pmga.Core.Domain.Authentication
{
    public class Role
    {
        public int Id { get; set; }
        [Required]
         [StringLength(255)]
        public string Nome { get; set; }
         [StringLength(1024)]
        public string Description { get; set; }
        public bool Active { get; set; }
        public DateTime CreationDate { get; set; }

        public ICollection<RolePermission> Permissions {get; set;}

        public Role()
        {
            Permissions = new Collection<RolePermission>();            
        }
    }
}