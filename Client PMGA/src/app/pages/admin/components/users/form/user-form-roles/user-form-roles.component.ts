import { UtilsService } from './../../../../../../utils/utils';
import { PermissionService } from './../../../../../../services/permission.service';
import { RoleService } from './../../../../../../services/role.service';
import { Role } from './../../../../../../models/Roles';
import { SelectItem, TreeNode } from 'primeng/primeng';
import { Component, OnInit, Output, EventEmitter, Input, NgZone } from '@angular/core';
import * as _ from 'underscore'; 

@Component({
  selector: 'app-user-form-roles',
  templateUrl: './user-form-roles.component.html',
  styleUrls: ['./user-form-roles.component.scss']
})
export class UserFormRolesComponent implements OnInit {

  @Input() group: any;
  @Input() selectedRole: any;
  @Input() selectedPermissions  : any[];
  @Output() setUserRole : EventEmitter<any> = new EventEmitter<any>();
  @Output() setUserPermissions : EventEmitter<any> = new EventEmitter<any>();
    
  roles: Role[];  
  nodes: any[] = []; 
  selectedNodes: TreeNode[] = [];  
  permissions: any[] = [];
  
  constructor(private roleService: RoleService,
  private permissionService : PermissionService,
  private ngZone: NgZone,) {
    this.populateRoles();   
    this.populateDefaultPermissions();         
  }  

  private populateRoles(){
    this.roleService.getRoles(null)
    .subscribe(result => {                  
      this.roles = result.items;          
    });     
  } 

  populateDefaultPermissions() {
    this.permissionService.getPermissions()
      .subscribe(result => {
        this.nodes = UtilsService.expandaAll(this.permissionService.transformToNodeList(result));
        this.populatePermissions();
      });
  }

  ngOnInit() {   
   
  }

  populatePermissions()
  {
    if (this.selectedPermissions)
    {
      this.setPermissions(this.selectedPermissions);
    }
  }
  
  populateRolePermissions(){        
    
    if (this.selectedRole)
    {      
      this.roleService.getRole(this.selectedRole)
      .subscribe(result => { 
        if(result.nome != "Custom")
        {
          if (result.permissions)
          {
            var permissions = _.pluck(result.permissions, 'id'); 
            this.setPermissions(permissions);
          }            
        }
      });    
    }
  }

  setPermissions(p){
    p.forEach(element => {      
      this.selectedNodes = UtilsService.findRecursiveNode(this.nodes,element,this.selectedNodes);
    });
  }

  
  //evento Role
  createNodes(){  
    this.selectedNodes = [];    
    this.populateRolePermissions();    
    this.setUserRole.emit({roleId : this.selectedRole});
  }


  //evento Permissoes  
  setNodesSelected($event)
  {
    this.permissions = [];
    this.selectedRole = 7;
    $event.selectedNodes.forEach(element => {
      this.permissions.push(element.data.id);  
    });
    this.setUserPermissions.emit({permissions: this.permissions});
  }     

 

}
