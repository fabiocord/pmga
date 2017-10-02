import { FormControl } from '@angular/forms';
import { Permission } from './../../../../../models/Permission';
import { Role } from './../../../../../models/Roles';
import { UserFormValidatorService } from 'app/pages/admin/components/users/form/user-form.validator';
import { Observable } from 'rxjs/Observable';
import { ControlMessagesComponent } from './../../../../shared/components/control-messages/control-messages.component';
import { UtilsService } from './../../../../../utils/utils';
import { ToastyService } from 'ng2-toasty';
import { RoleService } from './../../../../../services/role.service';
import { PermissionService } from './../../../../../services/permission.service';
import { UserService } from './../../../../../services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SaveUser } from './../../../../../models/User';
import { TreeNode, Message, SelectItem } from 'primeng/primeng';
import { Component, OnInit, NgZone, Injectable, Input } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import * as _ from 'underscore';
import cep from 'cep-promise';
// import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  ptbr: any;
  msgs: Message[] = [];
  permissions: number[] = [];
  selectedRoles: any[] = [];
  selectedNodes: TreeNode[] = [];
  nodes: TreeNode[] = [];
  group: any = {};
  @Input() user: any;
  @Input() documentoOld: string;
  @Input() emailOld: string;

  modalHeader: string;
  userForm: any;

  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private toastyService: ToastyService,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
  ) {
    this.populateDefaultPermissions();    
  }

  populateDefaultPermissions() {
    this.permissionService.getPermissions()
      .subscribe(result => {
        this.nodes = this.permissionService.transformToNodeList(result);
      });
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
    this.createValidations();
    this.populateValues();    
  }

  createValidations() {
    
        this.group = {
          'nome': ['', Validators.required],            
          'email': ['', [Validators.required, UserFormValidatorService.emailValidator],UserFormValidatorService.emailExistenteValidator(this.userService,this.emailOld)],
          'dataNascimento': ['', Validators.required],     
          'documento': ['', [Validators.required, UserFormValidatorService.documentoValidator],UserFormValidatorService.documentoExistenteValidator(this.userService,this.documentoOld)],
          'telefone1': ['', Validators.required],
          'telefone2': ['', Validators.required],
          'cep': ['', Validators.required],
          'bairro': ['', Validators.required],
          'logradouro': ['', Validators.required],
          'complemento': ['', Validators.required],
          'uf': ['', Validators.required],
          'cidade': ['', Validators.required],
          'confirmEmail': ['', Validators.required],
          'active': ['', Validators.required],
          'roles': [''],
        };
    
        this.userForm = this.formBuilder.group(this.group);
      }
    
  
  populateValues() {    
    if (this.user.id) {
      if(this.user.id > 0)
         this.setEditValues(this.user);      
    }
  }


  setEditValues(p) {        
    if (this.user.roles) {
      p.roles.forEach(element => {
        var role = this.roleService.getRole(element).subscribe(data => {
          var valorInput = { id: data.id, nome: data.nome, permissions: data.permissions }
          this.selectedRoles.push(valorInput);
        });
      });
    }

    if (this.user.permissions) {
      this.permissions = this.user.permissions;
      this.populateDefaultPermissions();
      this.populatePermissionsTab(this.permissions);
    }


    this.documentoOld = this.user.documento;
    this.emailOld = this.user.email;
  }

  setUserPermissions($event) {
    this.user.permissions = $event.permissions;
  }

  submit() {
    this.ngZone.run(() => {
      const result$ = (this.user.id)
        ? this.userService.update(this.user) : this.userService.create(this.user);
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

  populatePermissionsTab($event) {
    this.selectedNodes = [];
    this.permissions = $event.permissions;
    this.user.permissions = this.permissions;
    this.setPermissions(this.permissions);
  }

  setUserRoles($event) {
    this.user.roles = [];
    $event.roles.forEach(element => {
      this.user.roles.push(element.id);
    });
  }

  setPermissions(p) {
    p.forEach(element => {
      this.findRecursiveNode(this.nodes, element);
    });
  }

  findRecursiveNode(nodes, id) {
    for (var element of nodes) {
      if (element.data.id == id) {
        this.selectedNodes.push(element);
        break;
      }
      if (element.children)
        this.findRecursiveNode(element.children, id)
    }
  }

  buscaCep() {
    cep(this.user.cep).then(result => {
      this.user.bairro = result.neighborhood;
      this.user.cidade = result.city;
      this.user.uf = result.state;
      this.user.logradouro = result.street;

    });

  }

  setNodesSelected($event) {
    this.permissions = [];
    this.selectedNodes = $event.selectedNodes;
    this.selectedNodes.forEach(element => {
      this.permissions.push(element.data.id);
    });
  }

  closeModal() {
    // this.user = null;
    // this.documentoOld = "";
    // this.emailOld = "";
    this.activeModal.close();
  }

}
