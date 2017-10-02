import { PermissionService } from './../../../../../../services/permission.service';
import { TreeNode } from 'primeng/primeng';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-form-permissions',
  templateUrl: './user-form-permissions.component.html',
  styleUrls: ['./user-form-permissions.component.scss']
})
export class UserFormPermissionsComponent implements OnInit {

  @Input() permissions : number[];
  @Input() selectedNodes: TreeNode[] = [];
  @Output() setPermissionsOnParent : EventEmitter<any> = new EventEmitter<any>();
  nodes: any[] = []; 
  
  
  constructor(private permissionService: PermissionService) { 
    this.populatePermissions();   
  }

  ngOnInit() {
    this.setPermissions(this.permissions)
  }
  
  private populatePermissions(){
    this.permissionService.getPermissions()
    .subscribe(result => {     
      this.nodes = this.permissionService.transformToNodeList(result);          
    });     
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

  setNodesSelected($event){
    this.permissions = [];
    this.selectedNodes = $event.selectedNodes;
    this.selectedNodes.forEach(element => {
      this.permissions.push(element.data.id);
    });
   // this.setPermissionsOnParent.emit({permissions : this.permissions});    
  }

}
