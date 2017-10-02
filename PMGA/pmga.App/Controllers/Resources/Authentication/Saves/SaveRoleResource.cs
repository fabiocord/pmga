using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace pmga.Controllers.Resources.Authentication.Saves
{
    public class SaveRoleResource
    {
        public int Id { get; set; }        
        public string Nome { get; set; }         
        public string Description { get; set; }
        public bool Active { get; set; }
        public DateTime CreationDate { get; set; }
        public ICollection<int> Permissions {get; set;}

        public SaveRoleResource()
        {
            Permissions = new Collection<int>();            
        }
    }
}