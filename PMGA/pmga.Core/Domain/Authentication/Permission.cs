using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pmga.Core.Domain.Authentication
{
    public class Permission
    {        
        public int Id { get; set; }
        [Required]
         [StringLength(255)]
        public string Nome { get; set; }
        [StringLength(1024)]
        public string Description { get; set; }
        [Required]
         [StringLength(255)]
        public string Path { get; set; }       
        public DateTime CreationDate { get; set; }       
        public bool Active { get; set; }        
        public int? ParentId { get; set; }
        
        [ForeignKey("ParentId")]
        public Permission Parent { get; set;}        
    }
}