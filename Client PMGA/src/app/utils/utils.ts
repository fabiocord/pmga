import { TreeNode } from 'primeng/primeng';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  constructor(){}
 
  public static verificaCpfValido(cpf: string): boolean {
     if(cpf == '') return false; 
    // Elimina CPFs invalidos conhecidos    
    if (cpf.length != 11 || 
        cpf == "00000000000" || 
        cpf == "11111111111" || 
        cpf == "22222222222" || 
        cpf == "33333333333" || 
        cpf == "44444444444" || 
        cpf == "55555555555" || 
        cpf == "66666666666" || 
        cpf == "77777777777" || 
        cpf == "88888888888" || 
        cpf == "99999999999")
            return false;       
    // Valida 1o digito 
    var add = 0;    
    for (var i=0; i < 9; i ++)       
        add += parseInt(cpf.charAt(i)) * (10 - i);  
        var rev = 11 - (add % 11);  
        if (rev == 10 || rev == 11)     
            rev = 0;    
        if (rev != parseInt(cpf.charAt(9)))     
            return false;       
    // Valida 2o digito 
    add = 0;    
    for (i = 0; i < 10; i ++)        
        add += parseInt(cpf.charAt(i)) * (11 - i);  
    rev = 11 - (add % 11);  
    if (rev == 10 || rev == 11) 
        rev = 0;    
    if (rev != parseInt(cpf.charAt(10)))
        return false;       
    return true; 
  }


  public static findRecursiveNode(nodes,id,selectedNodes) {        
    for(var element of nodes)
    {
      if (element.data.id == id){ 
        selectedNodes.push(element);
        break;               
      }        
      if (element.children)
        this.findRecursiveNode(element.children,id,selectedNodes)
    } 
    return selectedNodes;   
  }

  public static expandaAll(nodes){
    nodes.forEach( node => {
      this.expandRecursive(node, true);
    } );
    return nodes;
  }

  private static expandRecursive(node:TreeNode, isExpand:boolean){
    node.expanded = isExpand;
    if(node.children){
        node.children.forEach( childNode => {
            this.expandRecursive(childNode, isExpand);
        } );
    }
  }

  public static arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
  }
}