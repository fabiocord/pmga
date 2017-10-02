export interface Permission {
    id: number;
    nome: string;
    description: string;
    path: string ;   
    creationDate: Date;
    parentId: number;
    active: boolean;
}

export interface SavePermission {
    id: number;
    nome: string;
    description: string;
    path: string;
    creationDate: Date;
    parentId: number;
    active: boolean; 
}
