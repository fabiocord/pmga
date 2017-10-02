import { Permission } from './../../../../models/Permission';
import { PermissionService } from './../../../../services/permission.service';
import { TreeNode } from "primeng/components/common/api";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from "@angular/router";
import { ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})
export class PermissionListComponent implements OnInit {

    titulo="Permissões";
    tree  : TreeNode[] = []; 
      msgs: Message[] = []; 

 
  constructor(private permissionService: PermissionService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {   
    this.populatePermissions();   
  }

  private populatePermissions()
  {
    this.permissionService.getPermissions()
    .subscribe(result => {     
      this.transformToNodeList(result)          
    });    
  }

   private transformToNodeList(result)  
   {  
      
      result.forEach(element => {        
        
        var node = {
          label : element.label,
          data: element.data,
          expandedIcon: "fa-folder-open",
          collapsedIcon: "fa-folder",
          children: element.children
        }

       node = this.transformPropriedades(node);         
       
       var nodes = [{ 
          label : node.label,
          data: node.data,
          expandedIcon: node.expandedIcon,
          collapsedIcon: node.collapsedIcon,
          children: node.children
       }]
        this.tree = nodes;                
      }); 
      
   }

   private transformPropriedades(node) : any
   {  
     
     node.children.forEach(element => {      

       if (element.children.length > 0)
        {           
          this.transformPropriedades(element);          
        }
       else
        {
          delete element['children']; 
        }        
     });

     return node; 
   }   
 
   onIncluir(event)
   {    
      if (event.data != null)
        this.router.navigate(['/admin/permissions/new',{parentId:event.data.id}]);
      else
        this.router.navigate(['/admin/permissions/new']);     
   }

   onEditar(event)
   {
     this.router.navigate(['/admin/permissions',event.data.id]);    
   }

   onExcluir(event)
   {
     this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir?',
            header: 'Confirmação',
            icon: 'fa fa-trash',
            
            accept: () => {
              try {
                this.permissionService.delete(event.data.id).subscribe(x => {
                  this.msgs = [{severity:'info', summary:'Confirmado', detail:'Permissão excluída'}];
                  this.populatePermissions();
                });
                
              } catch (error) {
                this.msgs = [{severity:'danger', summary:'Erro', detail:'Não foi possível excluir'}];
              }    
                
            }
              ,
            reject: () => {
                this.msgs = [{severity:'info', summary:'Negado', detail:'Não foi excluído'}];
            }
        });     
     
   }

}
