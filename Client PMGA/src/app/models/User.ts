import { Permission } from './Permission';
import { Role } from './Roles';
export interface User {
    id            :   number;
    nome          :   string;
    email         :   string;
    dataNascimento:   Date;
    documento     :   string;
    telefone1     :   string;
    telefone2     :   string;
    cep           :   string;
    bairro        :   string;  
    logradouro    :   string;
    complemento   :   string;
    uf            :   string;
    cidade        :   string;
    confirmEmail  :   boolean;
    active        :   boolean;
    createDate    :   Date;
    lastAccess    :   Date;
    facebookId    :   number;         
    password      :   string;
    permissions   :   Permission[];
    role         :   Role;
}

export interface SaveUser {
    id            :   number;
    nome          :   string;
    email         :   string;
    dataNascimento:   Date;
    documento     :   string;
    telefone1     :   string;
    telefone2     :   string;
    cep           :   string;
    bairro        :   string;
    logradouro    :   string;
    complemento   :   string;
    uf            :   string;
    cidade        :   string;
    confirmEmail  :   boolean;
    active        :   boolean;
    createDate    :   Date;
    lastAccess    :   Date;
    facebookId    :   number;         
    password      :   string;
    permissions   :   number[];
    roleId        :   number;
}


          
