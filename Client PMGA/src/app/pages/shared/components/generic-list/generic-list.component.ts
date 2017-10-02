import { LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.scss']
})
export class GenericListComponent implements OnInit {
  
  @Input() totalItems: any;
  @Input() query: any = {};
  @Input() columns: any; 
  @Input() title : string;   
  @Output() onDelete : EventEmitter<any> = new EventEmitter<any>();
  @Output() onEdicao : EventEmitter<any> = new EventEmitter<any>();
  @Output() onInclude : EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearchFilter : EventEmitter<any> = new EventEmitter<any>();
  @Input() source: LocalDataSource = new LocalDataSource();
  @Output() atualizaDados: EventEmitter<any>= new EventEmitter<any>();    
  

  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline" tooltip="Novo" ></i>',
      createButtonContent: '<i class="ion-checkmark" ></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit" tooltip="Editar"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      //mode: 'external',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"  tooltip="Excluir"></i>',
      //confirmDelete: false,
    },
    
    actions: {
      add: false,    
    },

    columns: {
    }
  };
  
  constructor() {    
  }

  ngOnInit() {
    this.settings.columns = this.columns;
  }

  onDeleteConfirm(event): void {
    this.onDelete.emit({
      data : event.data
    });
  }


  onEdit(event): void {    
    this.onEdicao.emit({
      data : event.data
    });
  }

  onIncludeClick() {
    this.onInclude.emit({
      
    });
  }
  onSearch(query: string = '') {
    this.onSearchFilter.emit({
      query: query
    });
  }

  onPageChange(page) {    
    this.query.page = page;     
    this.atualizaDados.emit({query: this.query});        
  }
  
}
