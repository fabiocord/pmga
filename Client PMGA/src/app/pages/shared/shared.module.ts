import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { Ng2SmartTableModule} from 'ng2-smart-table';
import { NgModule } from '@angular/core';
import { TreeModule, ButtonModule } from 'primeng/primeng';
import { TooltipModule } from "primeng/components/tooltip/tooltip";

@NgModule({
  imports: [
  ],
  exports: [
    TreeModule,
    FormsModule,
    ButtonModule,    
    Ng2SmartTableModule,  
    DataTableModule,
    TooltipModule,    
  ],
  declarations: [],
})
export class SharedModule { }
