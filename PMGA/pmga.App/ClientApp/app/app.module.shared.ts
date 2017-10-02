import { NewnavmenuComponent } from './components/newnavmenu/newnavmenu.component';
import { GenericTreeViewComponent } from './components/Shared/generic-tree-view/generic-tree-view.component';
import { PermissionListComponent } from './components/Authorization/lists/permission-list/permission-list.component';
import { PermissionFormComponent } from './components/Authorization/forms/permission-form/permission-form.component';
import { TreeModule, TreeNode, ButtonModule, GrowlModule, PanelModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ConfirmDialogModule } from "primeng/components/confirmdialog/confirmdialog";
import {MenubarModule,MenuItem} from 'primeng/primeng';
import { ToastyModule} from 'ng2-toasty';





export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        PermissionListComponent,
        PermissionFormComponent,
        GenericTreeViewComponent,
        NewnavmenuComponent
        ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        BrowserAnimationsModule,      
        TreeModule,
        ButtonModule,
        GrowlModule, 
        PanelModule,         
        ConfirmDialogModule,
        MenubarModule,        
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'admin/permissions', component: PermissionListComponent },
            { path: 'admin/permissions/new', component: PermissionFormComponent },
            { path: 'admin/permissions/:id', component: PermissionFormComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
};
