import { Permission } from './../models/Permission';
import { Permissions } from './../pages/admin/components/permissions/list/permissions.component';
import { SaveRole } from './../models/Roles';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RoleService {
  private readonly rolesEndPoint = 'http://localhost:5000/api/admin/roles';

  constructor(private http: Http) { }

  getRoles(filter) {    
    return this.http.get(this.rolesEndPoint+'?'+this.toQueryString(filter))
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

  create(role) {
    return this.http.post(this.rolesEndPoint, role)
    .map(res => res.json());
  }

  getRole(id) {
    return this.http.get(this.rolesEndPoint + '/' + id)
    .map(res => res.json());
  }
  
  update(role: SaveRole) {
    return this.http.put(this.rolesEndPoint + '/' + role.id, role)
    .map(res => res.json());
  }

  delete(id) {
    return this.http.delete(this.rolesEndPoint + '/' + id)
    .map(res => res.json());
  }

  transformToResultList(result) {  
    var SelectItem: any[] = [];
    
    result.forEach(element => {      
      let value = {
        label : element.nome,
        value: {id:element.id,nome:element.nome,permissions: element.permissions}
      };
     SelectItem.push(value);      
    }); 
    
    return SelectItem;    
 }
}
