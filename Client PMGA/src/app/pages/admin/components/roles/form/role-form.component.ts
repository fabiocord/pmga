import { Permissions } from './../../permissions/list/permissions.component';
import { PermissionService } from './../../../../../services/permission.service';
import { TreeNode } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import { SaveRole } from './../../../../../models/Roles';
import { ToastyService } from 'ng2-toasty';
import { RoleService } from './../../../../../services/role.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, NgZone } from '@angular/core';
import * as _ from 'underscore'; 

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  ptbr: any;  
  nodes: any[] = []; 
  selectedNodes: TreeNode[] = [];

  role: SaveRole = {
    id: -1,
    nome: '',
    description: '',    
    creationDate : new Date(),    
    active: false,
    permissions: []
  };

  id: number;  

  modalHeader: string;

  constructor( 
    private activeModal: NgbActiveModal,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private toastyService: ToastyService,
    private ngZone: NgZone) {       
      this.populatePermissions();    
    }

  ngOnInit() {
    
    this.ptbr = {      
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qa', 'Qu', 'Sx', 'Sb'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 
      'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],      
    };
      this.populateValues();       
  }

  private populatePermissions(){
    this.permissionService.getPermissions()
    .subscribe(result => {     
      this.nodes = this.permissionService.transformToNodeList(result);          
    });     
  } 

  populateValues(id?: number) {         
    this.id = +id || 0;     
    this.role.id = this.id;    

    if (this.role.id) {
      this.roleService.getRole(this.role.id).subscribe(data => {
        this.setRole(data);        
      }, err => {
        if (err.status === 404) {
          this.activeModal.close();
        }      
      });    
    }
  }

  setRole(p) {
    this.role.id = p.id;
    this.role.nome = p.nome;
    this.role.description = p.description;    
    this.role.creationDate = new Date(p.creationDate);    
    this.role.active = p.active;
    this.role.permissions = _.pluck(p.permissions, 'id'); 
    if (this.role.permissions)   
      this.setPermissions(this.role.permissions);
  }

  setPermissions(p){
    p.forEach(element => {
      this.findRecursiveNode(this.nodes,element);
    });
  }

  findRecursiveNode(nodes,id) {
    
    for(var element of nodes)
    {
      if (element.data.id == id){
         this.selectedNodes.push(element);
         break;
      }        
      if (element.children)
        this.findRecursiveNode(element.children,id)
    }    
  }

  getNodesSelected($event){
    this.role.permissions = [];
    this.selectedNodes = $event.selectedNodes;
    this.selectedNodes.forEach(element => {
      this.role.permissions.push(element.data.id);
    });
    
  }

  submit() {
    this.ngZone.run(() => {
      const result$ = (this.role.id)
       ? this.roleService.update(this.role) : this.roleService.create(this.role); 
      result$.subscribe(role => {
        this.toastyService.success({
          title: 'Sucesso', 
          msg: 'Dados salvos com sucesso.',
          theme: 'bootstrap',
          showClose: true,
          timeout: 5000,
        });        
         this.closeModal();
      });
    });
  } 

  closeModal() {
    this.activeModal.close();      
  }

}
