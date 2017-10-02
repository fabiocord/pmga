import { PermissionService } from './../../../../services/permission.service';
import { SavePermission } from './../../../../models/Permission';
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import {PanelModule,ButtonModule} from 'primeng/primeng';
import { ToastyService } from "ng2-toasty";

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.css']
})
export class PermissionFormComponent implements OnInit {
  
  permissionParent: '';
  permission: SavePermission = {
    id: -1,
    nome: '',
    description: '',
    path : '',    
    creationDate : '',
    parentId: -1,    
    active: false,

  }

  constructor( private route: ActivatedRoute,
    private router: Router,
    private permissionService: PermissionService,
    private toastyService: ToastyService,
    private ngZone : NgZone
  ) 
  {
        route.params.subscribe(p => {
        this.permission.parentId = +p['parentId'] || 1;
        this.permission.id = +p['id'] || 0;
     });
  }

  ngOnInit() {

  var sources = [];
    if (this.permission.parentId)
      this.permissionService.getPermission(this.permission.parentId).subscribe(data => {
        this.setParent(data);
      });

    if (this.permission.id)
      sources.push( this.permissionService.getPermission(this.permission.id));    
    Observable.forkJoin(sources).subscribe(data => {      
      if (this.permission.id)
        this.setPermission(data[0]);
    }, err => {
        if (err.status == 404)
          this.router.navigate(['/home']);    
    });
  }

  setPermission(p){
    this.permission.id= p.id;
    this.permission.nome = p.nome;
    this.permission.description= p.description;
    this.permission.path= p.path;    
    this.permission.creationDate= p.creationDate;
    this.permission.parentId= p.parentId;    
    this.permission.active= p.active;
    this.permissionService.getPermission(p.parentId).subscribe(data => {
      this.setParent(data);
    });
  }

  setParent(p)
  {
    this.permissionParent = p.nome;
  }

  submit() {
    this.ngZone.run(() => {
      var result$ = (this.permission.id) ? this.permissionService.update(this.permission) : this.permissionService.create(this.permission); 
      result$.subscribe(permission => {
        this.toastyService.success({
          title: 'Sucesso', 
          msg: 'Dados salvos com sucesso.',
          theme: 'bootstrap',
          showClose: true,
          timeout: 5000
        });
        this.router.navigate(['admin/permissions'])
      });
    });
  }  


}
