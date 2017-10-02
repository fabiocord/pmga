using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace pmga.Core.Domain.Authentication
{
    public class PermissionTree
    {
        public string Label { get; set; }        
        public Permission Data {get;set;}                 
        public string CollapsedIcon { get; set; } 
        public string ExpandedIcon { get; set; }         
        public List<PermissionTree> Children { get; set;} 
        public PermissionTree()            
        {
            Children = new List<PermissionTree>();
        }
    }
}