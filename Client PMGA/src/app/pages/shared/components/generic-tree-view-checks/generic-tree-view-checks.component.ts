import { TreeNode } from 'primeng/primeng';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generic-tree-view-checks',
  templateUrl: './generic-tree-view-checks.component.html',
  styleUrls: ['./generic-tree-view-checks.component.scss']
})
export class GenericTreeViewChecksComponent implements OnInit {

  @Input() nodes: TreeNode[];
  @Input() selectedNodes: TreeNode[];
  @Output() getNodesSelected: EventEmitter<any> = new EventEmitter<any>();
  
  
  constructor() { }


  ngOnInit() {
  }

  nodeSelect($event)
  {    
    this.getNodesSelected.emit({
      selectedNodes : this.selectedNodes
    })
  }

}
