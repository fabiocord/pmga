using System;

namespace pmga.Controllers.Resources.Authentication
{
    public class PermissionResource
    {
        public int Id { get; set; }        
        public string Nome { get; set; }        
        public string Description { get; set; }        
        public int? ParentId { get; set; }
        public string Path { get; set; }       
        public DateTime CreationDate { get; set; }        
       // public PermissionResource Parent { get; set; }
        public bool Active { get; set; }
    }
}