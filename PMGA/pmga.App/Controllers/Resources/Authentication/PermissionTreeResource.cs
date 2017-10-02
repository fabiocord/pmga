using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace pmga.Controllers.Resources.Authentication
{
    public class PermissionTreeResource
    {
        public string Label { get; set; }        
        public PermissionResource Data {get;set;}                 
        public string CollapsedIcon { get; set; } 
        public string ExpandedIcon { get; set; }         
        public List<PermissionTreeResource> Children { get; set;} 
        public PermissionTreeResource()            
        {
            Children = new List<PermissionTreeResource>();
        }
    }
}