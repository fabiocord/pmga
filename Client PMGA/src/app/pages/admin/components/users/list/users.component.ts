import { Role } from './../../../../../models/Roles';
import { SaveUser } from './../../../../../models/User';
import { UserFormComponent } from './../form/user-form.component';
import { UserService } from './../../../../../services/user.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit, NgZone } from '@angular/core';
import { ConfirmDialogModule, ConfirmationService, Message } from 'primeng/primeng';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as _ from 'underscore';

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  
})
export class UsersComponent implements OnInit { 
  private readonly PAGE_SIZE = 10;   
  totalItems : number;
  query: any = {
      pageSize: this.PAGE_SIZE
  };

  msgs: Message[] = []; 
  source: LocalDataSource = new LocalDataSource();
  title = "Lista de Usuários"; 
  
  user: SaveUser = {
    id: 0,
    nome: '',
    email: '',
    dataNascimento: new Date(),
    documento: '',
    telefone1: '',
    telefone2: '',
    cep: '',
    bairro: '',
    logradouro: '',
    complemento: '',
    uf: '',
    cidade: '',
    confirmEmail: false,
    active: false,
    createDate: new Date(),
    lastAccess: new Date(),
    facebookId: 0,
    password: '',
    permissions: [],
    roleId: 0,
  };

  
  columns= {
      id: {
        title: 'ID',        
        width: '5%',
        filter: false,
      },
      nome: {
        title: 'Nome',        
        width: '30%',
        filter: false,        
      },
      email: {
        title: 'E-mail',
        filter: false,
        width:'20%',         
      },
      dataNascimento: {
        title: 'Nascimento',
        filter: false,
        width:'5%',
        valuePrepareFunction: (value) => {return new Date(value).toLocaleDateString();},         
      },
      documento: {
        title: 'N° Documento',        
        filter: false,
        width:'10%',
        valuePrepareFunction: (value) => { var mascara ="###.###.###-##";var i =0; return mascara.replace(/#/g,_ => value.toString()[i++]) }        
      },
      cidade: {
        title: 'Cidade',
        filter: false,
        width:'10%'
      },
      uf: {
        title: 'UF', 
        filter: false,      
        width:'5%'
      },
      active: {
        title: 'Ativo', 
        filter: false,       
        valuePrepareFunction: (value) => { return value === true ? 'Sim' : 'Não' },
        width:'10%'
      },
      createDate: {
        title: 'Dt. Criação',       
        valuePrepareFunction: (value) => {return new Date(value).toLocaleDateString();},
        width:'5%',
        filter: false,
      },    
  };

  constructor( protected userService: UserService,
    private confirmationService: ConfirmationService,
    private modalService: NgbModal,
    private ngzone : NgZone
  ) {    
  }

  ngOnInit() {
     this.populateGrid();
  }

  populateGrid()
  {
    this.userService.getUsers(this.query)
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
            this.userService.delete(event.data.id).subscribe(x => {
              this.msgs = [{ severity: 'info', summary: 'Confirmado', detail: 'Usuário excluído' }];
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
   
    // this.populateValues(event.data.id).subscribe(resp => {

    // }) 

    this.userService.getUser(event.data.id).subscribe(data => {
      this.setUser(data);
      const activeModal = this.modalService.open(UserFormComponent, { size: 'lg' });       
      activeModal.componentInstance.modalHeader = 'Edição de Usuários';        
      activeModal.componentInstance.user = this.user;
      activeModal.componentInstance.documentoOld = this.user.documento;
      activeModal.componentInstance.emailOld = this.user.email;    
  
      activeModal.result.then((data) => {
        // this.user = null;
        // this.query.page = 1;
        this.populateGrid();      
      }, (reason) => {          
        this.populateGrid();      
      });
    });    
  }
  
  onInclude(){
      const activeModal = this.modalService.open(UserFormComponent, { size: 'lg' });       
      activeModal.componentInstance.modalHeader = 'Inclusão de Usuários'; 
      this.setInitialUser();
      activeModal.componentInstance.user = this.user;
      activeModal.componentInstance.documentoOld = "";
      activeModal.componentInstance.emailOld = "";
     // activeModal.componentInstance.createValidations();
      
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
        search: query
      },
      {
        field: 'email',
        search: query
      },
      {
        field: 'documento',
        search: query
      },
      {
        field: 'cidade',
        search: query
      },
      {
        field: 'uf',
        search: query
      },
      {
        field: 'active',
        search: query
      }
    ], false); 
  }

  populateValues(id?: number) {
    
        const _id = +id || -1;
        this.user.id = _id;
    
        if (this.user.id) {
          if(this.user.id > 0)
          {
            this.userService.getUser(this.user.id).subscribe(data => {
              this.setUser(data);               
            });        
          }          
        }
  }

  setUser(p) {
    this.user.id = p.id;
    this.user.nome = p.nome;
    this.user.createDate = new Date(p.createDate);
    this.user.active = p.active;
    this.user.email = p.email;
    this.user.dataNascimento = new Date(p.dataNascimento);
    this.user.documento = p.documento;
    this.user.telefone1 = p.telefone1;
    this.user.telefone2 = p.telefone2;
    this.user.cep = p.cep;
    this.user.bairro = p.bairro;
    this.user.logradouro = p.logradouro;
    this.user.complemento = p.complemento;
    this.user.uf = p.uf;
    this.user.cidade = p.cidade;
    this.user.confirmEmail = p.confirmEmail;
    this.user.lastAccess = new Date();
    this.user.facebookId = p.facebookId;
    this.user.password = p.password;
    this.user.permissions = _.pluck(p.permissions, 'id');
    this.user.roleId =p.role.id;        
  }
  setInitialUser() {
    this.user.id= 0;
    this.user.nome= '';
    this.user.email= '';
    this.user.dataNascimento= new Date();
    this.user.documento= '';
    this.user.telefone1= '';
    this.user.telefone2= '';
    this.user.cep= '';
    this.user.bairro= '';;
    this.user.logradouro= '';
    this.user.complemento= '';
    this.user.uf= '';
    this.user.cidade= '';
    this.user.confirmEmail= false;
    this.user.active= false;
    this.user.createDate= new Date();
    this.user.lastAccess= new Date();
    this.user.facebookId= 0;
    this.user.password= '';
    this.user.permissions= [];
    this.user.roleId= 0;
  }
}
