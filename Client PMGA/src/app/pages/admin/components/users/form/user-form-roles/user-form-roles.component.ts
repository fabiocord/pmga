import { PermissionService } from './../../../../../../services/permission.service';
import { RoleService } from './../../../../../../services/role.service';
import { Role } from './../../../../../../models/Roles';
import { SelectItem, TreeNode } from 'primeng/primeng';
import { Component, OnInit, Output, EventEmitter, Input, NgZone } from '@angular/core';

@Component({
  selector: 'app-user-form-roles',
  templateUrl: './user-form-roles.component.html',
  styleUrls: ['./user-form-roles.component.scss']
})
export class UserFormRolesComponent implements OnInit {

  @Input() selectedRoles: any[];  
  @Output() populatePermissionsTab : EventEmitter<any> = new EventEmitter<any>();
  @Output() setUserRoles : EventEmitter<any> = new EventEmitter<any>();
  
  rolesPermissions : any[] = [];    
  roles: SelectItem[];  
  nodes: any[] = []; 
  selectedNodes: TreeNode[] = [];
  selectedNodesConsolidado: TreeNode[] = [];
  permissions: any[] = [];
  
  constructor(private roleService: RoleService,
  private permissionService : PermissionService,
  private ngZone: NgZone,) {
    this.populateRoles();
    this.populatePermissions();      
  }  

  ngOnInit() {   
    this.populateRolePermissions();
  }
  
  private populateRoles(){
    this.roleService.getRoles(null)
    .subscribe(result => {     
      this.roles = this.roleService.transformToResultList(result.items);          
    });     
  } 

  private populatePermissions(){
    this.permissionService.getPermissions()
    .subscribe(result => {     
      this.nodes = this.permissionService.transformToNodeList(result);          
      this.populateRolePermissions();
    });     
  } 

  createNodes(){     
    
    this.selectedNodesConsolidado = [];
    //this.selectedRoles = [];
    this.populateRolePermissions();    
    
    this.setUserRoles.emit({roles : this.selectedRoles});
  }

  populateRolePermissions(){
    this.rolesPermissions = []; 
    
    let role = null;
    if (this.selectedRoles)
    {  
      this.selectedRoles.forEach(element => {
        this.selectedNodes = [];        
        this.setNodes(element.permissions);
        this.selectedNodes = this.expandaAll(this.selectedNodes);
        this.rolesPermissions.push({id: element.id,nome: element.nome, nodes: this.selectedNodes});
        this.selectedNodesConsolidado = this.arrayUnique(this.selectedNodesConsolidado);    
        this.permissions = this.arrayUnique(this.permissions);  
      });
      this.populatePermissionsTab.emit({permissions: this.permissions, selectedNodes: this.selectedNodesConsolidado});
    }
  }

  expandaAll(nodes){
    nodes.forEach( node => {
      this.expandRecursive(node, true);
    } );
    return nodes;
  }

  private expandRecursive(node:TreeNode, isExpand:boolean){
    node.expanded = isExpand;
    if(node.children){
        node.children.forEach( childNode => {
            this.expandRecursive(childNode, isExpand);
        } );
    }
}

  arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}

  
  setNodes(p){
    p.forEach(element => {      
      this.findRecursiveNode(this.nodes,element.id);
      this.permissions.push(element.id);
    });
  }

  findRecursiveNode(nodes,id) {    
    for(var element of nodes)
    {
      if (element.data.id == id){ 
         this.selectedNodesConsolidado.push(element); 
         if(!this.findExistInSelectNodeRecursive(this.selectedNodes,id))
          {            
            this.selectedNodes.push(element);            
          }
          break;
      }        
      if (element.children)
        this.findRecursiveNode(element.children,id)
    }    
  }

  findExistInSelectNodeRecursive(nodes,id,retorno = false)
  { 
    var retorno = retorno; 
    for (var element of nodes)
    {
      if (element.data.id == id){          
        retorno = true;
        break;        
      } else {
        
        if (element.children){
          retorno = this.findExistInSelectNodeRecursive(element.children,id,retorno);
          if (retorno)
            break;
        }    
          
      }
    }
    return retorno;
  }

}
