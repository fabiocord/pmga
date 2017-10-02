import { MenuItem } from 'primeng/components/common/menuitem';
import { Tree } from 'primeng/components/tree/tree';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import {TreeModule,TreeNode,ButtonModule} from 'primeng/primeng';
import { Message } from "primeng/components/common/message";



@Component({
  selector: 'app-generic-tree-view',
  templateUrl: './generic-tree-view.component.html',
  styleUrls: ['./generic-tree-view.component.css'],
  
})
export class GenericTreeViewComponent implements OnInit {
   
  @Input() titulo : string;  
  @Input() nodes: TreeNode[];
  @Output() Incluir: EventEmitter<any>= new EventEmitter<any>();
  @Output() Editar: EventEmitter<any>= new EventEmitter<any>();
  @Output() Excluir: EventEmitter<any>= new EventEmitter<any>();
  
  //@ViewChild('expandingTree')    
  msgs: Message[];
  selectedFile: TreeNode;
    
  constructor() { }

  ngOnInit() { 
      
    
  }

    nodeSelect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Selected', detail: event.node.label});
    }
    
    nodeUnselect(event) {
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'Node Unselected', detail: event.node.label});
    }

    onInclude(event){
         if (event != null)
            {
                this.Incluir.emit({        
                    data: event,  
                }); 
            }
        else
            {
                this.Incluir.emit({
                  data:  null
                }); 
            }         
    }

    onEdit(event){         
        this.Editar.emit({        
            data: event,  
        });        
    }

    onDelete(event){
        this.Excluir.emit({        
            data: event,  
        });        
    }

}
