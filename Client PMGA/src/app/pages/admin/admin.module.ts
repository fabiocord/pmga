// Shared Modules
import { SharedModule } from './../shared/shared.module';

//Services
import { IValidatorService } from './../../services/validator.service';
import { RoleService } from './../../services/role.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { PermissionService } from './../../services/permission.service';
import { UserService } from './../../services/user.service';
import { UserFormValidatorService } from "app/pages/admin/components/users/form/user-form.validator";

//Modules
import { NgaModule } from './../../theme/nga.module';
import { NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { AppTranslationModule } from './../../app.translation.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule, GrowlModule, InputMaskModule, DropdownModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ToastyModule } from 'ng2-toasty';
//import { FormsModule as AngularFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/components/calendar/calendar';


//Declarations

import { GenericListComponent } from './../shared/components/generic-list/generic-list.component';
import { GenericTreeViewComponent } from './../shared/components/generic-tree-view';
import { Permissions } from './components/permissions/list/permissions.component';
import { PermissionsFormComponent } from './components/permissions/form/permissions-form.component';
import { RolesComponent } from './components/roles/list/roles.component';
import { RoleFormComponent } from './components/roles/form/role-form.component';
import { UsersComponent } from './components/users/list/users.component';
import { ControlMessagesComponent } from './../shared/components/control-messages/control-messages.component';
import { GenericTreeViewChecksComponent } from './../shared/components/generic-tree-view-checks/generic-tree-view-checks.component';
import { PaginationComponent } from './../shared/components/pagination/pagination.component';

//Routes 
import { routing } from './admin.routing';
import { TabViewModule } from "primeng/components/tabview/tabview";
import { UserFormComponent } from './components/users/form/user-form.component';
import { UserFormRolesComponent } from './components/users/form/user-form-roles/user-form-roles.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,       
    NgaModule,
    ConfirmDialogModule,    
    GrowlModule, 
    NgbModalModule,
    ToastyModule.forRoot(),   
    //AngularFormsModule,
    AppTranslationModule,        
    CalendarModule,   
    routing,
    SharedModule,
    TabViewModule,
    InputMaskModule,
    ReactiveFormsModule,
    DropdownModule,
    
    
  ],
  declarations: [
    AdminComponent, 
    Permissions, 
    RolesComponent, 
    UsersComponent, 
    GenericTreeViewComponent,  
    GenericListComponent,
    PaginationComponent,   
    PermissionsFormComponent, 
    RoleFormComponent,
    GenericTreeViewChecksComponent,
    UserFormComponent,
    ControlMessagesComponent,
    UserFormRolesComponent,    
  ],
  entryComponents: [
    PermissionsFormComponent,
    RoleFormComponent,
    UserFormComponent,
    
  ],
  providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
        {provide: 'IValidatorService', useClass:UserFormValidatorService},
        PermissionService,
        RoleService,
        UserService,        
        ConfirmationService,
        UserFormValidatorService,
        
        
        // {provide: 'UserService', useClass:UserService}
  ],
})
export class AdminModule { }
