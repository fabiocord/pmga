using System;

namespace pmga.Core.Domain.Authentication.Querys
{
    public class PermissionQuery : AuthBaseQuery
    {
        public string Nome { get; set; }        
        public string Description { get; set; }        
        public string Path { get; set; }       
        public DateTime CreationDate { get; set; }
        public int? ParentId { get; set; }       
        public int? Active { get; set; }
    }
}