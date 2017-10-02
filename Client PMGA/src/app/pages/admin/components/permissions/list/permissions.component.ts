import { PermissionsFormComponent } from './../form/permissions-form.component';
import { PermissionService } from './../../../../../services/permission.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.html',
})
export class Permissions implements OnInit {

     
  tree: any[] = []; 
  msgs: Message[] = []; 

  constructor(private permissionService: PermissionService,
    private modalService: NgbModal,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.populatePermissions();
  }

  private populatePermissions() {
    this.permissionService.getPermissions()
    .subscribe(result => {     
      this.tree = this.permissionService.transformToNodeList(result);          
    });    
  }  
 
   onIncluir(event) {    
      if (event.data !== null) {
        const activeModal = this.modalService.open(PermissionsFormComponent, { size: 'lg' });       
        activeModal.componentInstance.modalHeader = 'Inclusão de Permissão';        
        activeModal.componentInstance.populateValues(0, event.data.id);
        
        activeModal.result.then((data) => {
          this.populatePermissions();
          event = null;
        }, (reason) => {          
          this.populatePermissions();
          event = null;
        });

      } else {       
        this.populatePermissions();
      }  
   }

   onEditar(event) {    
     const activeModal = this.modalService.open(PermissionsFormComponent, { size: 'lg' });       
        activeModal.componentInstance.modalHeader = 'Edição de Permissão';        
        activeModal.componentInstance.populateValues(event.data.id, 0);
        
        activeModal.result.then((data) => {
          this.populatePermissions();
          event = null;
        }, (reason) => {          
          this.populatePermissions();
          event = null;
        });
   }

   onExcluir(event) {
     this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir?',
            header: 'Confirmação',
            icon: 'fa fa-trash',
            
            accept: () => {
              try {
                this.permissionService.delete(event.data.id).subscribe(x => {
                  this.msgs = [{ severity: 'info', summary: 'Confirmado', detail: 'Permissão excluída' }];
                  this.populatePermissions();
                });
                
              } catch (error) {
                this.msgs = [{ severity: 'danger', summary: 'Erro', detail: 'Não foi possível excluir' }];
              }    
                
            }
              ,
            reject: () => {
                this.msgs = [{ severity: 'info', summary: 'Negado', detail: 'Não foi excluído' }];
            },
        });     
   }

   onClose(event) {
       this.populatePermissions();
   }
}
