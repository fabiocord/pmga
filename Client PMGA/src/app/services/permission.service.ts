import { SavePermission } from './../models/permission';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class PermissionService {
  private readonly permissionsEndPoint = 'http://localhost:5000/api/admin/permissions';

  constructor(private http: Http) { }

  getPermissions() {    
    return this.http.get(this.permissionsEndPoint)
    .map(res => res.json());    
  } 

  toQueryString(obj) {
      const parts = [];
    for (const property in obj) {
      const value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }
    return parts.join('&');
  }

  create(permission)
  {
    return this.http.post(this.permissionsEndPoint, permission)
    .map(res => res.json());
  }

  getPermission(id) {
    return this.http.get(this.permissionsEndPoint + '/' + id)
    .map(res => res.json());
  }
  
  update(permission: SavePermission) {
    return this.http.put(this.permissionsEndPoint + '/' + permission.id, permission)
    .map(res => res.json());
  }

  delete(id) {
    return this.http.delete(this.permissionsEndPoint + '/' + id)
    .map(res => res.json());
  }

  transformToNodeList(result) {  
      var tree: any[] = [];
      result.forEach(element => {        
        
        let node = {
          label : element.label,
          data: element.data,
          expandedIcon: 'fa-folder-open',
          collapsedIcon: 'fa-folder',
          children: element.children,
        };

       node = this.transformPropriedades(node);         
       
       const nodes = [{ 
          label : node.label,
          data: node.data,
          expandedIcon: node.expandedIcon,
          expanded: true,
          collapsedIcon: node.collapsedIcon,
          children: node.children,
       }];
        tree = nodes;                
      }); 
      return tree;
      
   }

   transformPropriedades(node): any {  
     
     node.children.forEach(element => {
        if (element.children.length > 0) {           
            this.transformPropriedades(element);          
        } else {
          delete element['children']; 
        }        
     });

     return node; 
   }   

}
