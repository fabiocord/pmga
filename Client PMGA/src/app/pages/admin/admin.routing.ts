import { UsersComponent } from './components/users/list/users.component';
import { RolesComponent } from './components/roles/list/roles.component';
import { Permissions } from './components/permissions/list/permissions.component';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'permissions', component: Permissions },
      { path: 'roles', component: RolesComponent },
      { path: 'users', component: UsersComponent },     
    ],    
  },
];

export const routing = RouterModule.forChild(routes);
