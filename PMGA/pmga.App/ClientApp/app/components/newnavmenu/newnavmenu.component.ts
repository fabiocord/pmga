import { Component, OnInit } from '@angular/core';
import {MenubarModule,MenuItem} from 'primeng/primeng';

@Component({
  selector: 'app-newnavmenu',
  templateUrl: './newnavmenu.component.html',
  styleUrls: ['./newnavmenu.component.css']
})
export class NewnavmenuComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
            {
                label: 'File',
                items: [{
                        label: 'New', 
                        icon: 'fa-plus',
                        items: [
                            {label: 'Project'},
                            {label: 'Other'},
                        ]
                    },
                    {label: 'Open'},
                    {label: 'Quit'}
                ]
            },
            {
                label: 'Edit',
                icon: 'fa-edit',
                items: [
                    {label: 'Undo', icon: 'fa-mail-forward'},
                    {label: 'Redo', icon: 'fa-mail-reply'}
                ]
            }
        ];
  }

}
