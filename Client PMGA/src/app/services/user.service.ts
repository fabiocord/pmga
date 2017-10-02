import { Observable } from 'rxjs/Observable';
import { SaveUser } from './../models/User';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class UserService {
  private readonly usersEndPoint = 'http://localhost:5000/api/admin/users';

  constructor(private http: Http) { }

  public getUsers(filter) {    
    return this.http.get(this.usersEndPoint+'?'+this.toQueryString(filter))
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

  checkDocumentoNotTaken(documentoOld,documento: string) {    
      return this.http.get(this.usersEndPoint+'?'+this.toQueryString({Documento : documento}))
      .map(res => res.json())
      .map(users => {
        if (documentoOld === documento)
          return true;
        else  {
          if (users.totalItems > 0)
            return false;
          else
            return true;  
        }
      });    
  }

  checkEmailNotTaken(emailOld,email: string) {    
      return this.http.get(this.usersEndPoint+'?'+this.toQueryString({Email : email}))
      .map(res => res.json())
      .map(users => {
        if (emailOld === email)
          return true;
        else {
          if (users.totalItems > 0)
            return false;
          else
            return true;  
        }        
      });    
  }

  create(user) {
    return this.http.post(this.usersEndPoint, user)
    .map(res => res.json());
  }

  getUser(id) {
    return this.http.get(this.usersEndPoint + '/' + id)
    .map(res => res.json());
  }
  
  update(user: SaveUser) {
    return this.http.put(this.usersEndPoint + '/' + user.id, user)
    .map(res => res.json());
  }

  delete(id) {
    return this.http.delete(this.usersEndPoint + '/' + id)
    .map(res => res.json());
  }

  

}