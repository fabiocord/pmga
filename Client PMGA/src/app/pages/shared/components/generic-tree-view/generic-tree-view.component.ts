import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from 'primeng/components/common/message';
import { TreeModule, TreeNode, ButtonModule } from 'primeng/primeng';

@Component({
    selector: 'app-generic-tree-view',
    templateUrl: './generic-tree-view.component.html',
    styleUrls: ['./generic-tree-view.component.scss'],
})
export class GenericTreeViewComponent implements OnInit {

    @Input() nodes: TreeNode[];
    @Output() incluir: EventEmitter<any> = new EventEmitter<any>();
    @Output() editar: EventEmitter<any> = new EventEmitter<any>();
    @Output() excluir: EventEmitter<any> = new EventEmitter<any>();

    // @ViewChild('expandingTree')    
    msgs: Message[];
    selectedFile: TreeNode;
    

    constructor() { }

    ngOnInit() {


    }

    nodeSelect(event) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'Node Selected', detail: event.node.label });
    }

    nodeUnselect(event) {
        // this.selectedFile = undefined;
        
        // this.msgs = [];
        // this.msgs.push({ severity: 'info', summary: 'Node Unselected', detail: event.node.label });
    }

    onInclude(event) {
        const valor = event;
        this.selectedFile = null;
        if (valor !== null) {            
            this.incluir.emit({
                data: valor,                
            });
        } else {
            this.incluir.emit({
                data: null,
            });
        }
       
    }

    onEdit(event) {
        const valor = event;
        this.selectedFile = null;
        this.editar.emit({
            data: valor,
        });
    }

    onDelete(event) {
        this.excluir.emit({
            data: event,
        });
    }
}
