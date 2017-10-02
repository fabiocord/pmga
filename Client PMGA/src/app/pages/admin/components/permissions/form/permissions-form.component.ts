import { PermissionService } from './../../../../../services/permission.service';
import { SavePermission } from './../../../../../models/Permission';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastyService } from 'ng2-toasty';
import { CalendarModule } from 'primeng/primeng';

@Component({
  selector: 'app-permissions-form',
  templateUrl: './permissions-form.component.html',
  styleUrls: ['./permissions-form.component.scss'],
})
export class PermissionsFormComponent implements OnInit {
 
  ptbr: any;
  permissionParent: '';
  permission: SavePermission = {
    id: -1,
    nome: '',
    description: '',
    path : '',    
    creationDate : new Date(),
    parentId: -1,    
    active: false,
  };
  
  parentId: number;
  id: number;  

  modalHeader: string;
  
  constructor(
    private activeModal: NgbActiveModal,
    private permissionService: PermissionService,
    private toastyService: ToastyService,    
    private ngZone: NgZone) {       
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
  }

  populateValues(id?: number, parentId?: number) {
    
     this.parentId = +parentId || 1;
     this.id = +id || 0;

     this.permission.parentId = this.parentId;
     this.permission.id = this.id;

     const sources = [];
    if (this.permission.parentId) {
      this.permissionService.getPermission(this.permission.parentId).subscribe(data => {
        this.setParent(data);
      });
    }

    if (this.permission.id) {
      sources.push( this.permissionService.getPermission(this.permission.id));    
    }
      
    Observable.forkJoin(sources).subscribe(data => {      
      if (this.permission.id) {
        this.setPermission(data[0]);
      }  
    }, err => {
        if (err.status === 404) {
          this.activeModal.close();
        }      
    });
  }

  setPermission(p) {
    this.permission.id = p.id;
    this.permission.nome = p.nome;
    this.permission.description = p.description;
    this.permission.path = p.path;    
    this.permission.creationDate = new Date(p.creationDate);
    this.permission.parentId = p.parentId;    
    this.permission.active = p.active;
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
      const result$ = (this.permission.id)
       ? this.permissionService.update(this.permission) : this.permissionService.create(this.permission); 
      result$.subscribe(permission => {
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
