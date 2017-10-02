import { RoleFormComponent } from './../form/role-form.component';
import { RoleService } from './../../../../../services/role.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from '@angular/core';
import { ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';
import { LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.html',  
})

export class RolesComponent implements OnInit {
  private readonly PAGE_SIZE = 10;
  totalItems : number;
  query: any = {
      pageSize: this.PAGE_SIZE
  };

  msgs: Message[] = []; 
  source: LocalDataSource = new LocalDataSource();
  title = "Lista de Roles";  
  
  columns = {
      id: {
        title: 'ID',        
        type: 'html',
        filter: false,
        valuePrepareFunction: (value) => { return '<div class="wide">' + value + '</div>'; }
      },
      nome: {
        title: 'Nome',
        filter: false,
        type: 'string',
      },
      description: {
        title: 'Descrição',
        filter: false,
        type: 'string',
      },
      active: {
        title: 'Ativo',
        filter: false,       
        type: 'string',
        valuePrepareFunction: (value) => { return value === true ? 'Sim' : 'Não' },

      },
      creationDate: {
        title: 'Data de Criação',
        filter: false,
        type: 'string',
        valuePrepareFunction: (value) => {return new Date(value).toLocaleDateString();},
      },        
  };

  constructor( protected roleService: RoleService,
    private confirmationService: ConfirmationService,
    private modalService: NgbModal,
    ) {    
  }

  ngOnInit() {
     this.populateGrid();
  }

  populateGrid() {
      this.roleService.getRoles(this.query)
      .subscribe(result => {       
          this.totalItems = result.totalItems
          this.source.load(result.items);
        });              
  }

  onAtualizaDados($event){
    this.query = $event.query;
    this.populateGrid();    
  }

  onDelete(event){    
    this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir?',
        header: 'Confirmação',
        icon: 'fa fa-trash',
        
        accept: () => {
          try {
            this.roleService.delete(event.data.id).subscribe(x => {
              this.msgs = [{ severity: 'info', summary: 'Confirmado', detail: 'Role excluída' }];
              this.query.page = 1;
              this.populateGrid();
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
  onEdit(event){
    const activeModal = this.modalService.open(RoleFormComponent, { size: 'lg' });       
    activeModal.componentInstance.modalHeader = 'Edição de Roles';        
    activeModal.componentInstance.populateValues(event.data.id);    
    activeModal.result.then((data) => {
      this.query.page = 1;
      this.populateGrid();      
    }, (reason) => {          
      this.populateGrid();      
    });
  }
  
  onInclude(){    
      const activeModal = this.modalService.open(RoleFormComponent, { size: 'lg' });       
      activeModal.componentInstance.modalHeader = 'Inclusão de Roles';        
      activeModal.componentInstance.populateValues(0);
      
      activeModal.result.then((data) => {
        this.query.page = 1;
        this.populateGrid();        
      }, (reason) => {      
        this.query.page = 1;    
        this.populateGrid();       
      });
  }

  onSearch($event){
      var query = $event.query;
      this.source.setFilter([
    // fields we want to include in the search
      {
        field: 'id',
        search: query
      },
      {
        field: 'nome',
        search: query,
        
      },
      {
        field: 'description',
        search: query
      },
      {
        field: 'active',
        search: query,               
      }
    ], false);
  
  }
  
}
