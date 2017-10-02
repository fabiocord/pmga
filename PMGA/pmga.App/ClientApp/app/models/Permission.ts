export interface Permission {
    id : number
    nome : string
    description : string
    path : string    
    creationDate : string;
    parentId: number;
    active : boolean 
}

export interface SavePermission {
    id : number
    nome : string
    description : string
    path : string
    creationDate : string;
    parentId: number;
    active : boolean 
}

// export interface PermissionTree {
    
//     label: string;    
//     data :  any;
//     expandedIcon: string;
//     collapsedIcon: string;
//     children: PermissionTree[];
// }
