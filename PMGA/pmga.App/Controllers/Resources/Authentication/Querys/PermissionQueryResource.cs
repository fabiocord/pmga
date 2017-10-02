using System;

namespace pmga.Controllers.Resources.Authentication.Querys
{
    public class PermissionQueryResource : BaseQueryResource
    {
        public string Nome { get; set; }        
        public string Description { get; set; }        
        public string Path { get; set; }       
        public DateTime CreationDate { get; set; }
        public int? ParentId { get; set; }     
        public int? Active { get; set; }
    }
}