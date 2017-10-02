import { SavePermission } from './../models/permission';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class PermissionService {
  private readonly permissionsEndPoint = '/api/admin/permissions';

  constructor(private http: Http) { }

  getPermissions(){    
    return this.http.get(this.permissionsEndPoint)
    .map(res => res.json());    
  } 

  toQueryString(obj){
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value !=null && value != undefined)
        parts.push(encodeURIComponent(property)+ '='+encodeURIComponent(value))
    }
    return parts.join('&');
  }

  create(permission,)
  {
    return this.http.post(this.permissionsEndPoint,permission)
    .map(res => res.json());
  }

  getPermission(id) {
    return this.http.get(this.permissionsEndPoint+'/'+id)
    .map(res => res.json());
  }
  
  update(permission: SavePermission) {
    return this.http.put(this.permissionsEndPoint+'/'+permission.id,permission)
    .map(res => res.json());
  }

  delete(id){
    return this.http.delete(this.permissionsEndPoint+ '/' +id)
    .map(res => res.json());
  }

}