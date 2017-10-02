import { Permission } from './Permission';
export interface Role {
    id: number;
    nome: string;
    description: string;
    active: boolean;
    creationDate: Date;
    permissions: Permission[];
}

export interface SaveRole {
    id: number;
    nome: string;
    description: string;
    active: boolean;
    creationDate: Date;
    permissions: number[];
}
